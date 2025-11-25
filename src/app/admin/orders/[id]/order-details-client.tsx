
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export function AdminOrderDetailsClient({ order }: { order: any }) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Detail Pesanan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">ID Pesanan</p>
              <p className="text-muted-foreground">{order.id}</p>
            </div>
            <div>
              <p className="font-medium">Tanggal</p>
              <p className="text-muted-foreground">
                {new Date(order.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div>
            <p className="font-medium">Status</p>
            <p className="text-muted-foreground">{order.status}</p>
          </div>
          <div>
            <p className="font-medium">Alamat Pengiriman</p>
            <p className="text-muted-foreground">
              {order.shipping_address.name}
            </p>
            <p className="text-muted-foreground">
              {order.shipping_address.email}
            </p>
            <p className="text-muted-foreground">
              {order.shipping_address.address}
            </p>
          </div>
          <div>
            <p className="font-medium">Item Pesanan</p>
            <div className="space-y-4">
              {order.order_items.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.products.imageUrl || "/placeholder.svg"}
                      alt={item.products.name}
                      width={48}
                      height={48}
                      className="rounded-md"
                    />
                    <div>
                      <p className="font-medium">{item.products.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Jumlah: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-4">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>

          {order.proof_of_payment_url && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-medium">Bukti Pembayaran</h3>
              <div className="relative w-full h-96">
                <Image
                  src={order.proof_of_payment_url}
                  alt="Bukti Pembayaran"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
