"use client"

import { useMemo } from "react"
import { products } from "@/lib/products"
// Impor ID produk terlaris untuk perbandingan
import { trendingProductIds } from "./trending-products"
import { ProductCard } from "./product-card"

interface ProductGridProps {
  searchTerm: string;
  selectedCategory: string | null;
  sortBy: string;
}

export default function ProductGrid({ searchTerm, selectedCategory, sortBy }: ProductGridProps) {
  const sortedAndFilteredProducts = useMemo(() => {
    let currentProducts = products;

    if (searchTerm) {
      currentProducts = currentProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      currentProducts = currentProducts.filter((product) => product.category === selectedCategory);
    }

    // Create a new array for sorting to avoid mutating the original
    const sortedProducts = [...currentProducts];

    if (sortBy === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    }

    return sortedProducts;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <>
      {sortedAndFilteredProducts.length > 0 ? ( <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {sortedAndFilteredProducts.map((product) => (
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