import { z } from "zod"

// Skema untuk validasi form produk
export const productSchema = z.object({
  id: z.string().optional(), // Opsional karena akan dibuat oleh DB saat insert
  name: z.string().min(3, { message: "Nama produk minimal 3 karakter." }),
  description: z.string().optional(),
  price: z.coerce
    .number({ invalid_type_error: "Harga harus berupa angka." })
    .positive({ message: "Harga harus lebih dari 0." }),
  stock: z.coerce
    .number({ invalid_type_error: "Stok harus berupa angka." })
    .int({ message: "Stok harus bilangan bulat." })
    .min(0, { message: "Stok tidak boleh negatif." }),
})

export type ProductFormValues = z.infer<typeof productSchema>