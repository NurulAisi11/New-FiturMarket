import * as z from "zod"

export const productSchema = z.object({
  id: z.string().optional(), // Opsional karena akan dibuat saat produk baru
  name: z.string().min(3, { message: "Nama produk harus minimal 3 karakter." }),
  description: z.string().min(10, { message: "Deskripsi harus minimal 10 karakter." }),
  price: z.coerce.number().min(0, { message: "Harga harus angka positif." }),
  category: z.string().min(1, { message: "Kategori harus diisi." }),
  imageUrl: z.string().url({ message: "URL gambar tidak valid." }).optional().or(z.literal('')),
})

export type ProductFormValues = z.infer<typeof productSchema>