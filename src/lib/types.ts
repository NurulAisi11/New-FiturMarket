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

export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  imageHint?: string
  category: string
  variants?: Variant[]
  reviews: Review[]
}

export interface User {
  id: string
  name: string
  email: string
  password?: string // Password sebaiknya tidak diekspos di client
  role: "admin" | "user"
}