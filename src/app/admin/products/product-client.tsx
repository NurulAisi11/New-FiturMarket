"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { ProductDialog } from "./product-dialog"
import { getColumns } from "./columns"
import type { Product } from "@/lib/types"

interface ProductClientProps {
  products: Product[]
  isAdmin: boolean
}

export function ProductClient({ products, isAdmin }: ProductClientProps) {
  const columns = getColumns(isAdmin)

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Manajemen Produk</h1>
        {isAdmin && (
          <ProductDialog>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Tambah Produk
            </Button>
          </ProductDialog>
        )}
      </div>
      <DataTable 
        columns={columns} 
        data={products} 
        filterColumn="name" 
        filterPlaceholder="Cari nama produk..."
      />
    </>
  )
}
