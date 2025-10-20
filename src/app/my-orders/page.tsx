"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { mockOrders, MockOrder } from "@/lib/mock-orders"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"

const getLatestStatus = (order: MockOrder) => {
  if (order.statusHistory.length === 0) {
    return "N/A"
  }
  return order.statusHistory[order.statusHistory.length - 1].status
}

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "Tiba di Tujuan":
      return "default"
    case "Dalam Pengiriman":
      return "secondary"
    case "Pesanan Dibuat":
    case "Diproses oleh Penjual":
      return "outline"
    default:
      return "destructive"
  }
}

export default function MyOrdersPage() {
  // Dummy functions for Header props
  const handleSearch = (term: string) => { console.log("Searching for:", term) }
  const handleImageSearch = (event: React.ChangeEvent<HTMLInputElement>) => { console.log("Image search triggered") }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header onSearch={handleSearch} onImageSearch={handleImageSearch} />
      <main className="flex-1 bg-muted/40">
        <div className="container mx-auto px-4 md:px-6 py-8 sm:py-12">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Riwayat Pesanan Saya</CardTitle>
              <CardDescription>
                Berikut adalah daftar semua pesanan yang pernah Anda buat. Klik ID Pesanan untuk melacak.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Pesanan</TableHead>
                    <TableHead>Nama Pelanggan</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        <Link href={`/track-order?id=${order.id}`} className="text-primary hover:underline">{order.id}</Link>
                      </TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell className="text-right">{formatPrice(order.total)}</TableCell>
                      <TableCell className="text-center"><Badge variant={getStatusVariant(getLatestStatus(order))}>{getLatestStatus(order)}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

