"use client"

import { useEffect, useState } from "react"
import { getPersonalizedRecommendations, PersonalizedRecommendationsOutput } from "@/lib/mock-recommendations"
import { ProductCard } from "@/components/product-card"
import { trendingProductIds } from "./trending-products"
import { Skeleton } from "@/components/ui/skeleton"

export default function AiRecommendations() {
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendationsOutput | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setIsLoading(true)
        const data = await getPersonalizedRecommendations()
        setRecommendations(data)
      } catch (error) {
        console.error("Failed to fetch AI recommendations:", error)
        setRecommendations(null) // Atau tangani error dengan cara lain
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl mb-6">
        Rekomendasi untuk Anda
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {isLoading && Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-[180px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
        {!isLoading && recommendations?.products.map((product) => <ProductCard key={product.id} product={product} isTrending={trendingProductIds.includes(product.id)} />)}
      </div>
    </section>
  )
}
