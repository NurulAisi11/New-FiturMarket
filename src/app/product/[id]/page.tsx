"use client"

import { useState, useMemo } from "react"
import { products } from "@/lib/products"
import { notFound, useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { formatPrice } from "@/lib/utils"
import { ShoppingCart, ArrowLeft, Tag, Star, Minus, Plus, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/product-card"
import { ChatSheet } from "@/components/chat-sheet"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = typeof params.id === "string" ? params.id : ""
  const product = products.find((p) => p.id === productId) // Pastikan 'products' diimpor

  const { addToCart } = useCart()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [isChatOpen, setIsChatOpen] = useState(false)

  if (!product) {
    notFound()
  }

  const { totalReviews, averageRating } = useMemo(() => {
    if (!product) return { totalReviews: 0, averageRating: 0 } // Tambahkan pengecekan
    const total = product.reviews.length
    if (total === 0) return { totalReviews: 0, averageRating: 0 }
    const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0)
    return { totalReviews: total, averageRating: sum / total }
  }, [product.reviews])

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const handleAddToCart = () => {
    // Memanggil addToCart dari context dengan kuantitas yang dipilih
    addToCart(product, quantity)
    setQuantity(1) // Reset kuantitas setelah ditambahkan
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ChatSheet product={product} isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
        <div className="container flex h-16 items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Kembali</span>
          </Button>
          <h1 className="ml-4 font-semibold text-lg">{product.name}</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative aspect-square">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col">
            <div className="flex-grow">
              <div className="flex items-center gap-4 mb-2">
                <Badge variant="secondary" className="text-sm">
                  <Tag className="mr-1 h-3 w-3" />
                  {product.category}
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-600">
                  Stok Tersedia
                </Badge>
              </div>
              <div className="flex items-center gap-2 mb-4">
                {totalReviews > 0 && (
                  <>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.round(averageRating) ? "fill-current" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({totalReviews} ulasan)</span>
                  </>
                )}
              </div>
              <p className="text-muted-foreground text-base mb-6">{product.description}</p>
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-4xl font-bold text-primary">{formatPrice(product.price)}</p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold w-10 text-center">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg py-7" onClick={() => setIsChatOpen(true)}>
                  <MessageSquare className="mr-3 h-6 w-6" />
                  Chat Toko
                </Button>
                <Button size="lg" className="w-full text-lg py-7" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-3 h-6 w-6" />
                  Tambah ke Keranjang ({quantity})
                </Button>
              </div>
            </div>
          </div>
        </div>

        {totalReviews > 0 && (
          <section className="mt-16 sm:mt-24">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Ulasan Pelanggan ({totalReviews})</h2>
            <div className="space-y-8">
              {product.reviews.map((review) => (
                <div key={review.id} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0 text-center sm:text-left">
                    <p className="font-semibold">{review.author}</p>
                    <p className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-1 mb-2 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {relatedProducts.length > 0 && (
          <section className="mt-16 sm:mt-24">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Anda Mungkin Juga Suka</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 md:px-6 py-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FiturMarket. Seluruh hak dilindungi.</p>
        </div>
      </footer>
    </div>
  )
}