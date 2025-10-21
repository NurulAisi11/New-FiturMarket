"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { products } from "@/lib/products"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Star, MessageSquare, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { ChatSheet } from "@/components/chat-sheet"
import { QualityPassportDisplay } from "@/components/quality-passport-display"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { addToCart } = useCart()

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  const averageRating =
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
    product.reviews.length

  const handleAddToCart = () => {
    addToCart(product)
    // Di sini Anda bisa menambahkan notifikasi toast
    alert(`${product.name} telah ditambahkan ke keranjang!`)
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-3xl font-bold text-primary">
            {formatPrice(product.price)}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(averageRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews.length} ulasan)
            </span>
          </div>
          <p className="mt-6 text-base text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8 flex gap-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Tambah ke Keranjang
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Chat Penjual
            </Button>
          </div>

          {/* Menampilkan Quality Passport secara otomatis */}
          {product.qualityPassport && (
            <QualityPassportDisplay passport={product.qualityPassport} />
          )}
        </div>
      </div>

      {/* Bagian Ulasan */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold">Ulasan Pelanggan</h2>
        <div className="mt-6 space-y-6">
          {product.reviews.map((review) => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{review.author}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <ChatSheet product={product} isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
    </div>
  )
}