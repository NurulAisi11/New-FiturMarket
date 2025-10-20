import { products } from "@/lib/products"
import type { Product } from "@/lib/types"

export interface PersonalizedRecommendationsOutput {
  products: Product[]
}

export async function getPersonalizedRecommendations(): Promise<PersonalizedRecommendationsOutput> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mengambil produk secara acak dari daftar produk utama
  const shuffled = [...products].sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, 3)

  return {
    products: selected,
  }
}
