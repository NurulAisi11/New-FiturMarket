"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"

const promotions = [
  {
    id: 1,
    title: "Diskon Akhir Tahun!",
    description: "Dapatkan diskon hingga 50% untuk produk elektronik pilihan. Jangan sampai ketinggalan!",
    imageUrl: "https://picsum.photos/seed/promo1/1200/400",
    link: "/",
  },
  {
    id: 2,
    title: "Gratis Ongkir Seluruh Indonesia",
    description: "Nikmati gratis ongkir tanpa minimum pembelian selama bulan ini. Belanja sekarang!",
    imageUrl: "https://picsum.photos/seed/promo2/1200/400",
    link: "/",
  },
  {
    id: 3,
    title: "Koleksi Furnitur Terbaru",
    description: "Ciptakan ruang kerja impian Anda dengan koleksi furnitur ergonomis terbaru kami.",
    imageUrl: "https://picsum.photos/seed/promo3/1200/400",
    link: "/",
  },
]

export function PromotionSlider() {
  return (
    <Carousel
      plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
      opts={{ align: "start", loop: true }}
      className="w-full"
    >
      <CarouselContent>
        {promotions.map((promo) => (
          <CarouselItem key={promo.id}>
            <Link href={promo.link} className="block p-1">
              <Card className="overflow-hidden">
                <CardContent className="relative aspect-[16/6] w-full p-0">
                  <Image src={promo.imageUrl} alt={promo.title} fill className="object-cover" sizes="100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                    <h3 className="text-2xl md:text-4xl font-bold text-balance">{promo.title}</h3>
                    <p className="mt-2 max-w-xl text-sm md:text-base text-pretty">{promo.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  )
}