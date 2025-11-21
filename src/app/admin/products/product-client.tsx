"use client"

import { useProductSheet } from "@/hooks/use-product-sheet"
import { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getColumns } from "./columns"
import { DataTable } from "./data-table"
import { ProductDialog } from "./product-dialog"

interface ProductClientProps {
  products: Product[]
  isAdmin: boolean
}

export function ProductClient({ products, isAdmin }: ProductClientProps) {
  const { onOpen } = useProductSheet()
  const columns = getColumns(isAdmin)

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Produk</CardTitle>
              <CardDescription>Kelola semua produk di toko Anda.</CardDescription>
            </div>
            {isAdmin && (
              <ProductDialog>
                <Button>Tambah Produk</Button>
              </ProductDialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={products} filterColumn="name" filterPlaceholder="Cari nama produk..." />
        </CardContent>
      </Card>
    </>
  )
}