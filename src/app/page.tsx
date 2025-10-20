"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import AiRecommendations from "@/components/ai-recommendations"
import { Header } from "@/components/header"
import ProductGrid from "@/components/product-grid"
import { PromoSlider } from "@/components/promo-slider"
import { TrustBar } from "@/components/trust-bar"
import { TrendingProducts } from "@/components/trending-products"
import { products } from "@/lib/products" // Import products to get categories
import { Button } from "@/components/ui/button" // Assuming you have a Button component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 
export default function HomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [userLocation, setUserLocation] = useState("")
  const [shippingInfo, setShippingInfo] = useState<{
    cost: number
    estimate: string
  } | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("relevance")
  const [isCalculating, setIsCalculating] = useState(false)

  // Extract unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(p => p.category));
    return ["Semua", ...Array.from(uniqueCategories)];
  }, []);

  useEffect(() => {
    const category = searchParams.get('category')
    setSelectedCategory(category)
  }, [searchParams])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleShippingCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userLocation) return

    setIsCalculating(true)
    setShippingInfo(null)

    // Simulate API call
    setTimeout(() => {
      const randomCost = Math.floor(Math.random() * (50000 - 15000 + 1)) + 15000
      const randomDay = Math.floor(Math.random() * 3) + 2
      setShippingInfo({
        cost: randomCost,
        estimate: `${randomDay}-${randomDay + 2} hari`,
      })
      setIsCalculating(false)
    }, 1500)
  }

  const handleCategoryChange = (category: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const value = category === "Semua" ? null : category;

    if (!value) {
      current.delete("category");
    } else {
      current.set("category", value);
    }
    router.push(`/?${current.toString()}`);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleImageSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Di aplikasi nyata, Anda akan mengirim file ini ke API
      // untuk diproses dan mendapatkan hasil pencarian.
      alert(`Pencarian gambar dengan: ${file.name}`);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header onSearch={handleSearch} onImageSearch={handleImageSearch} />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/10 to-transparent">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl xl:text-6xl/none">
                Temukan Produk Terbaik di FiturMarket
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Jelajahi koleksi produk berkualitas tinggi dengan rekomendasi AI
                yang dipersonalisasi untuk Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-6">
        <PromoSlider />
      </section>

      <main className="flex-1">
        <TrustBar />

        <section className="bg-muted/40 py-8 sm:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                Cek Ongkos Kirim ke Lokasi Anda
              </h2>
              <p className="mt-3 text-muted-foreground">
                Masukkan lokasi Anda (contoh: kota atau kecamatan) untuk
                mendapatkan estimasi biaya dan waktu pengiriman.
              </p>
              <form
                onSubmit={handleShippingCheck}
                className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row"
              >
                <input
                  type="text"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  placeholder="Contoh: Jakarta Selatan"
                  className="w-full flex-grow rounded-md border bg-card px-4 py-2 focus:border-primary focus:ring-primary"
                  required
                />
                <button
                  type="submit"
                  disabled={isCalculating}
                  className="rounded-md bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/50"
                >
                  {isCalculating ? "Menghitung..." : "Cek Ongkir"}
                </button>
              </form>
              {shippingInfo && (
                <div className="animate-in fade-in-50 duration-500 mt-6 rounded-lg border bg-card p-4 text-left">
                  <h3 className="text-lg font-semibold">Hasil Pengecekan:</h3>
                  <p className="mt-2 text-muted-foreground">
                    Estimasi Biaya:{" "}
                    <span className="font-bold text-primary">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(shippingInfo.cost)}
                    </span>
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Estimasi Sampai:{" "}
                    <span className="font-bold text-primary">
                      {shippingInfo.estimate}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Trending Products Section */}
        <section className="container mx-auto px-4 md:px-6 py-8">
          <TrendingProducts />
        </section>

        {!searchTerm && (
          <div className="container mx-auto px-4 py-8 md:px-6 sm:py-12">
            <AiRecommendations />
          </div>
        )}

        {/* Product Section with Filters */}
        <section className="container mx-auto px-4 md:px-6 py-8">
          <div className="mb-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              {selectedCategory ? `Kategori: ${selectedCategory}` : "Produk Pilihan Untukmu"}
            </h2>
            <div className="flex w-full items-center justify-end gap-2 md:w-auto">
              <span className="text-sm font-medium">Urutkan:</span>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]" id="sort-by">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevansi</SelectItem>
                  <SelectItem value="price-desc">Harga: Tertinggi</SelectItem>
                  <SelectItem value="price-asc">Harga: Terendah</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="font-medium">Kategori:</span>
            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category || (selectedCategory === null && category === "Semua") ? "default" : "outline"}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <ProductGrid searchTerm={searchTerm} selectedCategory={selectedCategory} sortBy={sortBy} />
        </section>
      </main>
    </div>
  )
}
