
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { uploadProofOfPayment } from "@/app/checkout/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export function OrderDetailsClient({ order }: { order: any }) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Tidak ada file yang dipilih",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadProofOfPayment(order.id, formData);

    setIsUploading(false);

    if (result.error) {
      toast({
        title: "Gagal Mengunggah Bukti Pembayaran",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Bukti Pembayaran Berhasil Diunggah",
        description:
          "Status pesanan Anda akan diperbarui setelah kami memverifikasi pembayaran.",
      });
      router.refresh();
    }
  };

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
            <p className="text-muted-foreground">{order.shipping_address.name}</p>
            <p className="text-muted-foreground">{order.shipping_address.email}</p>
            <p className="text-muted-foreground">{order.shipping_address.address}</p>
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

          {order.status === "pending_payment" && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-medium">Unggah Bukti Pembayaran</h3>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Bukti Pembayaran</Label>
                <Input id="picture" type="file" onChange={handleFileChange} />
              </div>
              <Button onClick={handleUpload} disabled={isUploading || !file}>
                {isUploading ? "Mengunggah..." : "Unggah"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
