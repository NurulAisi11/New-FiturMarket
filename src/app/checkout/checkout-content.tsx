"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ShoppingCart } from "lucide-react"

import { useCart } from "@/context/cart-context"
import { BuyNowSummary } from "@/app/checkout/buy-now-summary"
import { CheckoutForm } from "@/components/checkout-form"
import { OrderSummary } from "@/components/order-summary"
import { Button } from "@/components/ui/button"
import { products, Product } from "@/lib/products"

export function CheckoutContent() {
  const { cartCount } = useCart()
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get("productId")

  const [buyNowProduct, setBuyNowProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (productId) {
      const foundProduct = products.find((p) => p.id === productId)
      setBuyNowProduct(foundProduct || null)
    }
    setIsLoading(false)
  }, [productId])

  // Jika ini adalah mode "Beli Sekarang"
  if (productId) {
    if (isLoading) {
      return (
        <div className="flex flex-col min-h-screen items-center justify-center text-center p-4">
          <h1 className="text-2xl font-bold">Memuat Produk...</h1>
        </div>
      )
    }
    if (!buyNowProduct) {
      return (
        <div className="flex flex-col min-h-screen items-center justify-center text-center p-4">
          <h1 className="text-2xl font-bold mb-2">Produk Tidak Ditemukan</h1>
          <Button asChild>
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      )
    }
  }

  // Jika keranjang kosong DAN bukan mode "Beli Sekarang"
  if (cartCount === 0 && !productId) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-center p-4">
        <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Keranjang Anda Kosong</h1>
        <p className="text-muted-foreground mb-6">
          Sepertinya Anda belum menambahkan produk apa pun ke keranjang.
        </p>
        <Button asChild>
          <Link href="/">Kembali Berbelanja</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Kembali</span>
          </Button>
          <h1 className="ml-4 font-semibold text-lg">Checkout</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <CheckoutForm />
          </div>
          {buyNowProduct ? (
            <BuyNowSummary product={buyNowProduct} />
          ) : (
            <OrderSummary />
          )}
        </div>
      </main>
    </>
  )
}