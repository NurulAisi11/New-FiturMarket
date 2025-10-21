"use client"

import { Badge } from "@/components/ui/badge"

interface StockIndicatorProps {
  stock: number
}

export function StockIndicator({ stock }: StockIndicatorProps) {
  if (stock > 10) {
    return <Badge variant="secondary">Stok Tersedia</Badge>
  }

  if (stock > 0) {
    return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Stok Terbatas</Badge>
  }

  return <Badge variant="destructive">Stok Habis</Badge>
}