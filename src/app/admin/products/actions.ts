"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { productSchema, type ProductFormValues } from "@/lib/schemas"
import { type Product } from "@/lib/types"

/**
 * Fungsi helper untuk memverifikasi apakah pengguna saat ini adalah admin.
 * @returns {Promise<boolean>} True jika admin, false jika tidak.
 */
async function isAdmin(): Promise<boolean> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return false

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return profile?.role === 'admin'
}

export async function getProducts(): Promise<{ products: Product[]; error: string | null }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return { products: [], error: error.message }
  }

  return { products: data as Product[], error: null }
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching product by id:", error)
    return null
  }

  return data as Product
}

export async function saveProduct(
  payload: ProductFormValues & { id?: string }
): Promise<{ success: boolean; error: string | null }> {
  // Hanya admin yang bisa menyimpan produk
  if (!(await isAdmin())) {
    return { success: false, error: "Akses ditolak: Hanya admin yang dapat menyimpan produk." }
  }

  const validatedFields = productSchema.safeParse(payload)

  if (!validatedFields.success) {
    return { success: false, error: "Data tidak valid." }
  }

  const { id, ...productData } = validatedFields.data

  const supabase = await createClient()
  const query = id
    ? supabase.from("products").update(productData).eq("id", id)
    : supabase.from("products").insert(productData)

  const { error } = await query

  if (error) {
    console.error("Error saving product:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/products") // Memberi tahu Next.js untuk memuat ulang data di halaman ini
  return { success: true, error: null }
}

export async function uploadImage(
  formData: FormData
): Promise<{ publicUrl: string | null; error: string | null }> {
  // Hanya admin yang bisa mengunggah gambar
  if (!(await isAdmin())) {
    return { publicUrl: null, error: "Akses ditolak: Hanya admin yang dapat mengunggah gambar." }
  }

  const file = formData.get("file") as File

  if (!file) {
    return { publicUrl: null, error: "Tidak ada file yang diunggah." }
  }

  const fileName = `${crypto.randomUUID()}-${file.name}`
  const supabase = await createClient()
  const { error: uploadError } = await supabase.storage
    .from("product-images") // Pastikan nama bucket ini sama dengan yang Anda buat di Supabase
    .upload(fileName, file)

  if (uploadError) {
    console.error("Upload error:", uploadError)
    return { publicUrl: null, error: uploadError.message }
  }

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName)

  return { publicUrl: data.publicUrl, error: null }
}

export async function deleteProduct(
  id: string
): Promise<{ success: boolean; error: string | null }> {
  // Hanya admin yang bisa menghapus produk
  if (!(await isAdmin())) {
    return { success: false, error: "Akses ditolak: Hanya admin yang dapat menghapus produk." }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    console.error("Error deleting product:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/products")
  return { success: true, error: null }
}
