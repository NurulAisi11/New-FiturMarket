"use client"

import { PlusCircle } from "lucide-react"

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
import { DataTable } from "@/components/data-table"
import { ProductForm } from "./product-form"

interface ProductClientProps {
  products: Product[]
  isAdmin: boolean
}

export function ProductClient({ products, isAdmin }: ProductClientProps) {
  const { onOpen } = useProductSheet()
  const columns = getColumns(isAdmin)

  return (
    <>
      <ProductForm />
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Produk</CardTitle>
              <CardDescription>Kelola semua produk di toko Anda.</CardDescription>
            </div>
            {isAdmin && (
              <Button onClick={() => onOpen()}><PlusCircle className="h-4 w-4 mr-2" /> Tambah Produk</Button>
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