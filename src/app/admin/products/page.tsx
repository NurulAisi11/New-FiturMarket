import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getProducts } from "./actions"
import { ProductClient } from "./product-client"

// Otorisasi sekarang ditangani oleh layout.tsx
export default async function ProductsPage() {
  const { products, error } = await getProducts()

  if (error) {
    return (
      <Card className="text-center p-8">
        <CardHeader>
          <CardTitle className="text-destructive">Gagal memuat produk</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return <ProductClient products={products} isAdmin={true} />
}
