import { getProducts, type Product } from "./actions"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export const dynamic = "force-dynamic"

export default async function ProductsPage() {
  const { products, error } = await getProducts()

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <p className="text-red-500">Gagal memuat produk: {error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Manajemen Produk</h1>
      <DataTable columns={columns} data={products} />
    </div>
  )
}