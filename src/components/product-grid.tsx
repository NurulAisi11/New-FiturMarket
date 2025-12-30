"use client"

import { useMemo } from "react"
import type { Product } from "@/lib/types"
import { trendingProductIds } from "./trending-products"
import { ProductCard } from "./product-card"

interface ProductGridProps {
  products: Product[];
  searchTerm?: string;
  selectedCategory?: string;
  sortBy?: string;
}

export default function ProductGrid({ products, searchTerm, selectedCategory, sortBy }: ProductGridProps) {
  // Gunakan Set untuk pencarian ID produk terlaris yang lebih cepat (O(1) average time complexity)
  const trendingIdsSet = useMemo(() => new Set(trendingProductIds), []);

  const sortedAndFilteredProducts = useMemo(() => {
    // Pastikan 'products' adalah array untuk mencegah error.
    if (!Array.isArray(products)) {
      return [];
    }

    const filteredProducts = products.filter(product => {
      // Filter berdasarkan kata kunci pencarian
      const matchesSearchTerm = searchTerm
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      // Filter berdasarkan kategori yang dipilih
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;

      return matchesSearchTerm && matchesCategory;
    });

    // Lakukan pengurutan pada array hasil filter.
    // Membuat salinan array dengan [...filteredProducts] untuk menghindari mutasi array asli.
    const sorted = [...filteredProducts];
    if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    }

    return sorted; // Kembalikan hasil filter dan urutkan
  }, [products, searchTerm, selectedCategory, sortBy]);

  return (
    <>
      {sortedAndFilteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {sortedAndFilteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isTrending={trendingIdsSet.has(product.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">Produk tidak ditemukan.</p>
      )}
    </>
  );
}