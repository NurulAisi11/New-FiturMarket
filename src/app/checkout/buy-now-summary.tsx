"use client"

import Image from "next/image"
import { Product } from "@/lib/products"

interface BuyNowSummaryProps {
  product: Product
}

export function BuyNowSummary({ product }: BuyNowSummaryProps) {
  return (
    <div className="bg-card p-6 rounded-lg border h-fit sticky top-24">
      <h2 className="text-xl font-semibold mb-4 border-b pb-4">Ringkasan Pesanan</h2>
      <div className="flex items-center space-x-4">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={80}
          height={80}
          className="w-20 h-20 rounded-md object-cover"
        />
        <div>
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-muted-foreground">Jumlah: 1</p>
        </div>
        <p className="ml-auto font-medium">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(product.price)}</p>
      </div>
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(product.price)}</span>
        </div>
      </div>
    </div>
  )
}