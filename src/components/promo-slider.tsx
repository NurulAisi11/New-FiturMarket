"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CountdownTimer } from "./countdown-timer"
import { Button } from "./ui/button"

const promotions = [
  {
    title: "Diskon Besar Akhir Tahun!",
    description: "Dapatkan diskon hingga 50% untuk semua produk elektronik favoritmu.",
    imageUrl: "/images/promo-1.png", // Ganti dengan path gambar Anda
    alt: "Ilustrasi diskon elektronik",
    // Tambahkan tanggal berakhir (contoh: 5 hari dari sekarang)
    endDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    link: "/product/2", // Mengarahkan langsung ke halaman produk Headphone
  },
  {
    title: "Gratis Ongkir Tanpa Batas",
    description: "Nikmati gratis ongkir ke seluruh Indonesia tanpa minimum pembelian.",
    imageUrl: "/images/promo-2.png", // Ganti dengan path gambar Anda
    alt: "Ilustrasi gratis ongkir",
    // Contoh: 2 hari dari sekarang
    endDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    link: "/",
  },
  {
    title: "Voucher Spesial Pengguna Baru",
    description: "Daftar sekarang dan klaim voucher belanja senilai Rp 100.000.",
    imageUrl: "/images/promo-3.png", // Ganti dengan path gambar Anda
    alt: "Ilustrasi voucher belanja",
    // Contoh: 10 hari dari sekarang
    endDate: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    link: "/register", // Contoh link ke halaman registrasi
  },
  {
    title: "Berkah Ramadan Sale",
    description: "Sambut bulan suci dengan diskon spesial untuk produk fashion dan kebutuhan rumah tangga.",
    imageUrl: "/images/promo-ramadan.png", // Ganti dengan path gambar Anda
    alt: "Ilustrasi diskon Ramadan",
    // Contoh: 20 hari dari sekarang
    endDate: new Date(new Date().getTime() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    link: "/product/16", // Mengarahkan ke Kemeja Flanel
  },
]

export function PromoSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {promotions.map((promo, index) => (
          <CarouselItem key={index}>
            <Link href={promo.link} className="p-1 cursor-pointer group block">
              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-muted p-6 text-white sm:aspect-[16/5]">
                <Image
                  src={promo.imageUrl}
                  alt={promo.alt}
                  fill
                  className="absolute z-0 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="z-20 flex flex-col items-center justify-end h-full w-full max-w-4xl text-center pb-4">
                  <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                    {promo.title}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
                    {promo.description}
                  </p>
                  {isClient && (
                    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-400">
                      <CountdownTimer
                        endDate={promo.endDate}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16 hidden sm:flex" />
      <CarouselNext className="mr-16 hidden sm:flex" />
    </Carousel>
  )
}