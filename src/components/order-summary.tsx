"use client"

import { useCart } from "@/context/cart-context"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"

export function OrderSummary() {
  const { cartItems, cartTotal } = useCart()

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Ringkasan Pesanan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded-md"
                  data-ai-hint={item.imageHint}
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Jumlah: {item.quantity}</p>
                  {item.selectedVariant && Object.keys(item.selectedVariant).length > 0 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {Object.entries(item.selectedVariant).map(([type, value]) => (
                        <p key={type}>{type}: {value}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Pengiriman</span>
          <span>Gratis</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Pajak</span>
          <span>Dihitung di langkah berikutnya</span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
