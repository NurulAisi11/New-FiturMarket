"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/utils"
import { productSchema, type ProductFormValues } from "@/lib/schemas"
import { auth } from "@/lib/auth"

// Definisikan tipe Product sesuai dengan tabel di Supabase
export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  stock: number
  image_url: string | null
  created_at: string
}

export async function getProducts(): Promise<{ products: Product[]; error: string | null }> {
  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return { products: [], error: error.message }
  }

  return { products: data, error: null }
}

export async function saveProduct(
  data: ProductFormValues
): Promise<{ success: boolean; error: string | null }> {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    return { success: false, error: "Tidak diizinkan." }
  }

  const validation = productSchema.safeParse(data)
  if (!validation.success) {
    return { success: false, error: validation.error.flatten().fieldErrors.toString() }
  }

  const supabase = createSupabaseServerClient()
  const { id, ...productData } = validation.data

  const query = id
    ? supabase.from("products").update(productData).eq("id", id) // Update
    : supabase.from("products").insert(productData) // Insert

  const { error } = await query

  if (error) {
    console.error("Error saving product:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/products")
  return { success: true, error: null }
}

export async function deleteProduct(
  productId: string
): Promise<{ success: boolean; error: string | null }> {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    return { success: false, error: "Tidak diizinkan." }
  }

  const supabase = createSupabaseServerClient()
  const { error } = await supabase.from("products").delete().eq("id", productId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/products")
  return { success: true, error: null }
}