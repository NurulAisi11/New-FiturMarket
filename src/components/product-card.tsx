"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { Product } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
  isTrending?: boolean
  discountPercentage?: number
}

export function ProductCard({ product, isTrending, discountPercentage }: ProductCardProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Produk ditambahkan",
      description: `${product.name} telah ditambahkan ke keranjang.`,
    })
  }

  const handleBuyNow = () => {
    // 1. Buat URL untuk checkout dengan ID produk
    const checkoutUrl = `/checkout?productId=${product.id}`

    // 2. Arahkan pengguna ke halaman checkout
    router.push(checkoutUrl)
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
      {isTrending && (
        <div className="absolute left-2 top-2 z-10 rounded-full bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">
          Terlaris
        </div>
      )}
      {discountPercentage && (
        <div className="absolute right-2 top-2 z-10 rounded-md bg-destructive px-2 py-1 text-xs font-bold text-destructive-foreground">
          -{discountPercentage}%
        </div>
      )}
      <Link href={`/product/${product.id}`} className="flex flex-1 flex-col">
        <div className="aspect-square overflow-hidden bg-muted">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col space-y-2 p-4 pb-2">
          <h3 className="font-semibold truncate text-sm">{product.name}</h3>
          <div className="flex flex-col">
            {product.discountPrice ? (
              <>
                <p className="text-sm text-muted-foreground line-through">
                  {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(product.price)}
                </p>
                <p className="text-lg font-bold text-destructive">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(product.discountPrice)}</p>
              </>
            ) : (
              <p className="text-lg font-bold text-primary">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(product.price)}</p>
            )}
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <div className="flex flex-col gap-2 pt-0 sm:flex-row">
          <button onClick={handleAddToCart} className="flex-1 rounded-md border border-primary bg-transparent px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10">
            + Keranjang
          </button>
          <button onClick={handleBuyNow} className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  )
}
