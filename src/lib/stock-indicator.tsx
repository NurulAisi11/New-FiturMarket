"use client"

import { Package, PackageCheck, PackageX, Smile } from "lucide-react"

interface StockIndicatorProps {
  stock: number | undefined
}

const LOW_STOCK_THRESHOLD = 5

export function StockIndicator({ stock }: StockIndicatorProps) {
  if (stock === undefined) {
    // Fallback jika data stok tidak ada
    return (
      <div className="flex items-center gap-2 text-sm font-medium text-green-600">
        <PackageCheck className="h-4 w-4" />
        <span>Stok Tersedia</span>
      </div>
    )
  }

  if (stock === 0) {
    return (
      <div className="flex items-center gap-2 text-sm font-medium text-destructive">
        <PackageX className="h-4 w-4" />
        <span>Stok Habis</span>
      </div>
    )
  }

  if (stock > LOW_STOCK_THRESHOLD) {
    return (
      <div className="flex items-center gap-2 text-sm font-medium text-green-600">
        <Smile className="h-4 w-4" />
        <span>Stok Melimpah</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-sm font-medium text-amber-600">
      <Package className="h-4 w-4" />
      <span>Tersisa {stock} buah!</span>
    </div>
  )
}