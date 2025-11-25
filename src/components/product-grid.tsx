"use client"

import type { Product } from "@/lib/types"
import { trendingProductIds } from "./trending-products"
import { ProductCard } from "./product-card"

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isTrending={trendingProductIds.includes(product.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">Produk tidak ditemukan.</p>
      )}
    </>
  );
}