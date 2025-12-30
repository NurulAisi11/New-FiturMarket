export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  createdAt: string
}

export interface VariantOption {
  value: string
  label: string
}

export interface Variant {
  type: string
  options: VariantOption[]
}

export interface QualityPassport {
  tokenId: string
  origin: string
  materials: string[]
  manufacturingProcess: string
  certifications: string[]
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  imageHint?: string
  category: string
  variants?: Variant[]
  qualityPassport?: QualityPassport // Menambahkan qualityPassport sebagai properti opsional
  reviews: Review[]
  moq?: number
  wholesale_pricing?: {
    min_quantity: number
    price_per_unit: number
  }[]
}

export interface User {
  id: string
  name: string
  email: string
  password?: string // Password sebaiknya tidak diekspos di client
  role: "admin" | "user"
}