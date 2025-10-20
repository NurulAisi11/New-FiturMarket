import { products } from "./products"
import type { Product } from "./types"

// Set flash sale end date (e.g., 3 hours from now)
const flashSaleEndDate = new Date()
flashSaleEndDate.setHours(flashSaleEndDate.getHours() + 3)

const flashSaleProductIds = ["2", "7", "15", "19"]

export const flashSaleProducts: Product[] = products
  .filter((p) => flashSaleProductIds.includes(p.id))
  .map((product) => {
    let discountPrice = product.price
    if (product.id === "2") discountPrice = product.price * 0.8 // 20% off
    if (product.id === "7") discountPrice = product.price * 0.75 // 25% off
    if (product.id === "15") discountPrice = product.price * 0.7 // 30% off
    if (product.id === "19") discountPrice = product.price * 0.85 // 15% off

    return {
      ...product,
      discountPrice: Math.round(discountPrice / 1000) * 1000, // Round to nearest 1000
      flashSaleEndDate: flashSaleEndDate.toISOString(),
    }
  })

