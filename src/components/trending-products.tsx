"use client"

import { products } from "@/lib/products"
import { ProductCard } from "./product-card"

// Di aplikasi nyata, ID ini akan datang dari API.
// Untuk sekarang, kita pilih beberapa produk secara manual.
export const trendingProductIds = ["1", "5", "8", "11", "14", "16"]

const trendingProducts = products.filter((p) =>
  trendingProductIds.includes(p.id)
)

export function TrendingProducts() {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
        Produk Terlaris
      </h2>
      <div className="relative">
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {trendingProducts.map((product) => (
            <div key={product.id} className="w-56 flex-shrink-0 md:w-64">
              <ProductCard product={product} isTrending={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}