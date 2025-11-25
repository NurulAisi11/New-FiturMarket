import * as z from "zod"

export const qualityPassportSchema = z.object({
  origin: z.string().optional(),
  materials: z.array(z.string()).optional(),
  manufacturingProcess: z.string().optional(),
  certifications: z.array(z.string()).optional(),
})

export const wholesalePricingSchema = z.object({
  min_quantity: z.coerce.number().min(1),
  price_per_unit: z.coerce.number().min(0),
});

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Nama produk harus minimal 3 karakter." }),
  description: z.string().min(10, { message: "Deskripsi harus minimal 10 karakter." }),
  price: z.coerce.number().min(0, { message: "Harga harus angka positif." }),
  stock: z.coerce.number().min(0, { message: "Stok harus angka positif." }),
  category: z.string().min(1, { message: "Kategori harus diisi." }),
  imageUrl: z.string().url({ message: "URL gambar tidak valid." }).optional().or(z.literal('')),
  qualityPassport: qualityPassportSchema.optional(),
  moq: z.coerce.number().min(1, { message: "MOQ harus minimal 1." }),
  wholesale_pricing: z.array(wholesalePricingSchema).optional(),
})

export type ProductFormValues = z.infer<typeof productSchema>