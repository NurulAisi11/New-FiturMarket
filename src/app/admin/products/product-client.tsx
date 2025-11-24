"use client"

import { PlusCircle } from "lucide-react"
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
import { DataTable } from "@/components/data-table" 
import { ProductDialog } from "./product-dialog"

interface ProductClientProps {
  products: Product[]
  isAdmin: boolean
}

export function ProductClient({ products, isAdmin }: ProductClientProps) {
  const columns = getColumns(isAdmin)

  return (
    <>
      < <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Produk</CardTitle>
              <CardDescription>Kelola semua produk di toko Anda.</CardDescription>
            </div>
            {isAdmin && (
              <ProductDialog>
                <Button><PlusCircle className="h-4 w-4 mr-2" /> Tambah Produk</Button>
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
