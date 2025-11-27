"use client"

<<<<<<< HEAD
import type { Product } from "@/lib/types"
=======
import { useMemo } from "react"
import type { Product } from "@/lib/types" // Impor tipe data Product
>>>>>>> 1588f59 (push)
import { trendingProductIds } from "./trending-products"
import { ProductCard } from "./product-card"

interface ProductGridProps {
  products: Product[];
}

<<<<<<< HEAD
export default function ProductGrid({ products }: ProductGridProps) {
=======
export default function ProductGrid({ products, searchTerm, selectedCategory, sortBy }: ProductGridProps) {
  // Gunakan Set untuk pencarian ID produk terlaris yang lebih cepat (O(1) average time complexity)
  const trendingIdsSet = useMemo(() => new Set(trendingProductIds), []);

  const sortedAndFilteredProducts = useMemo(() => {
    // Pastikan 'products' adalah array untuk mencegah error.
    if (!Array.isArray(products)) {
      return [];
    }

    let filteredProducts = products.filter(product => {
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
    if (sortBy === 'price-desc') {
      return [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'price-asc') {
      return [...filteredProducts].sort((a, b) => a.price - b.price);
    }

    return filteredProducts; // Kembalikan hasil filter jika tidak ada kriteria pengurutan
  }, [products, searchTerm, selectedCategory, sortBy]);

>>>>>>> 1588f59 (push)
  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
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