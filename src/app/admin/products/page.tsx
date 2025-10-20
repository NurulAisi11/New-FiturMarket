import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getProducts } from "./actions"
import { createClient } from "@/lib/supabase/server"
import { ProductClient } from "./product-client"

export default async function ProductsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isAdmin = user?.user_metadata?.role === 'admin'

  if (!isAdmin) {
    return (
      <Card className="text-center p-8">
        <CardHeader>
          <CardTitle className="text-destructive">Akses Ditolak</CardTitle>
          <CardDescription>Anda tidak memiliki izin untuk mengakses halaman ini.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

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

  return <ProductClient products={products} isAdmin={isAdmin} />
}
