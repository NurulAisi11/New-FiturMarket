"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { deleteProduct, type Product } from "./actions"
import { formatPrice } from "@/lib/utils"
import { ProductDialog } from "./product-dialog"

const handleDelete = async (productId: string, toast: any) => {
  if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return

  const { success, error } = await deleteProduct(productId)

  if (success) {
    toast({
      title: "Sukses",
      description: "Produk berhasil dihapus.",
    })
  } else {
    toast({
      title: "Gagal",
      description: error || "Gagal menghapus produk.",
      variant: "destructive",
    })
  }
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Produk
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => formatPrice(row.original.price),
  },
  {
    accessorKey: "stock",
    header: "Stok",
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const product = row.original
      const { toast } = useToast()

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
              <ProductDialog product={product}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Edit
                </DropdownMenuItem>
              </ProductDialog>
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => handleDelete(product.id, toast)}
              >
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]