"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center text-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">
            Pesanan Berhasil Dibuat!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Terima kasih telah berbelanja di FiturMarket. Pesanan Anda dengan ID{" "}
            <span className="font-bold text-primary">{orderId}</span> telah kami
            terima dan sedang diproses.
          </p>
          <p className="text-muted-foreground">
            Silakan lakukan pembayaran dan unggah bukti pembayaran di halaman
            detail pesanan.
          </p>
          <div className="flex gap-4">
            <Button asChild className="flex-1">
              <Link href={`/my-orders/${orderId}`}>Lihat Detail Pesanan</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1"
              onClick={() => router.push("/")}
            >
              <Link href="/">Kembali ke Beranda</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessPageContent />
        </Suspense>
    )
}