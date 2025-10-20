"use client"

import { useState, useTransition } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Edit, Trash, Loader2 } from "lucide-react"

import { useProductSheet } from "@/hooks/use-product-sheet"
import { useToast } from "@/hooks/use-toast"
import { Product } from "@/lib/types"
import { deleteProduct } from "./actions"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price)
}

const baseColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Nama Produk <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="pl-4">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category",
    header: "Kategori",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Harga</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      return <div className="text-right font-medium">{formatPrice(price)}</div>
    },
  },
]

const actionColumn: ColumnDef<Product> = {
  id: "actions",
  header: () => <div className="text-right">Aksi</div>,
  cell: ({ row }) => {
    const product = row.original
    const { onOpen } = useProductSheet()
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()

    const onDelete = () => {
      if (!confirm(`Apakah Anda yakin ingin menghapus produk "${product.name}"?`)) return

      startTransition(async () => {
        const result = await deleteProduct(product.id)
        if (result.success) {
          toast({ title: "Berhasil", description: "Produk telah dihapus." })
        } else {
          toast({ title: "Gagal", description: result.error, variant: "destructive" })
        }
      })
    }

    return (
      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onOpen(product.id)}><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete} disabled={isPending} className="text-red-500 focus:text-red-500 focus:bg-red-50">{isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash className="mr-2 h-4 w-4" />} Hapus</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  },
}

export const getColumns = (isAdmin: boolean): ColumnDef<Product>[] => {
  return isAdmin ? [...baseColumns, actionColumn] : baseColumns
}