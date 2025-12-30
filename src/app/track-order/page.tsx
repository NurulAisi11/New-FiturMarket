"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { findOrderById, MockOrder } from "@/lib/mock-orders"
import { OrderTrackingTimeline } from "@/components/order-tracking-timeline"
import { Loader2, Search } from "lucide-react"

export default function TrackOrderPage() {
  const searchParams = useSearchParams()
  const initialOrderId = searchParams.get("id") || ""
  const [orderId, setOrderId] = useState(initialOrderId)
  const [order, setOrder] = useState<MockOrder | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTrackOrder = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!orderId.trim()) return

    setIsLoading(true)
    setError(null)
    setOrder(null)

    const foundOrder = await findOrderById(orderId.trim())

    if (foundOrder) {
      setOrder(foundOrder)
    } else {
      setError(`Pesanan dengan ID "${orderId}" tidak ditemukan. Silakan periksa kembali ID pesanan Anda.`)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (initialOrderId) {
      handleTrackOrder()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialOrderId])

  // Dummy functions for Header props
  const handleSearch = (term: string) => { console.log("Searching for:", term) }
  const handleImageSearch = (event: React.ChangeEvent<HTMLInputElement>) => { console.log("Image search triggered") }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header onSearch={handleSearch} onImageSearch={handleImageSearch} />
      <main className="flex-1 bg-muted/40">
        <div className="container mx-auto px-4 md:px-6 py-8 sm:py-12">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Lacak Pesanan Anda</CardTitle>
              <CardDescription>
                Masukkan ID Pesanan Anda untuk melihat status pengiriman terkini.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrackOrder} className="flex items-center gap-2 mb-6">
                <Input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Contoh: FTM-12345" className="flex-grow" />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                  Lacak
                </Button>
              </form>

              {error && <div className="text-center text-destructive p-4 bg-destructive/10 rounded-md">{error}</div>}

              {order && <div className="animate-in fade-in-50 duration-500"><h3 className="text-lg font-semibold mb-2">Detail Pesanan: {order.id}</h3><p className="text-sm text-muted-foreground mb-4">Untuk: <span className="font-medium text-foreground">{order.customerName}</span></p><OrderTrackingTimeline statusHistory={order.statusHistory} /></div>}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}