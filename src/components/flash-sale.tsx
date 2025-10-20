"use client"

import { useEffect, useState } from "react"
import { flashSaleProducts } from "@/lib/flash-sale-products"
import { ProductCard } from "./product-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Zap } from "lucide-react"

const calculateTimeLeft = (endDate: string) => {
  const difference = +new Date(endDate) - +new Date()
  let timeLeft = {
    hours: "00",
    minutes: "00",
    seconds: "00",
  }

  if (difference > 0) {
    timeLeft = {
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    }
  }

  return timeLeft
}

export function FlashSale() {
    const endDate = flashSaleProducts[0]?.flashSaleEndDate
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endDate || new Date().toISOString()))
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (!isClient || !endDate) return

        if (!endDate) return

        const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(endDate))
        }, 1000)

        return () => clearInterval(timer)
    }, [endDate, isClient])

    if (!endDate || flashSaleProducts.length === 0) {
        return null
    }

    return (
        <div className="bg-destructive/10 border-y border-destructive/20">
            <div className="container mx-auto px-4 md:px-6 py-8 sm:py-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                    <div className="flex items-center gap-3 mb-4 sm:mb-0">
                        <Zap className="h-8 w-8 text-destructive" />
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-destructive">Flash Sale</h2>
                    </div>
                    <div className="flex items-center gap-2 text-center">
                        {isClient && (
                            <>
                                <span className="text-sm text-muted-foreground">Berakhir dalam</span>
                                <div className="flex gap-1">
                                    <span className="bg-destructive text-destructive-foreground font-bold text-lg rounded-md px-2 py-1 tabular-nums">{timeLeft.hours}</span>
                                    <span className="font-bold text-lg">:</span>
                                    <span className="bg-destructive text-destructive-foreground font-bold text-lg rounded-md px-2 py-1 tabular-nums">{timeLeft.minutes}</span>
                                    <span className="font-bold text-lg">:</span>
                                    <span className="bg-destructive text-destructive-foreground font-bold text-lg rounded-md px-2 py-1 tabular-nums">{timeLeft.seconds}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <Carousel opts={{ align: "start", loop: false }} className="w-full">
                    <CarouselContent className="-ml-4">
                        {flashSaleProducts.map((product) => {
                            const discountPercentage = product.discountPrice
                                ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
                                : 0
                            return (
                                <CarouselItem key={product.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                                    <ProductCard product={product} discountPercentage={discountPercentage} />
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="left-[-10px] sm:left-[-20px]" />
                    <CarouselNext className="right-[-10px] sm:right-[-20px]" />
                </Carousel>
            </div>
        </div>
    )
}
