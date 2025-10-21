import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getProducts } from "./actions"
import { createSupabaseServerClient } from "@/lib/supabase/utils"
import { ProductClient } from "./product-client"

export default async function ProductsPage() {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Ambil profil pengguna yang sedang login dari tabel 'profiles'
  const { data: profile } = user 
    ? await supabase.from('profiles').select('role').eq('id', user.id).single() 
    : { data: null }
    
  const isAdmin = profile?.role === 'admin'
  
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
