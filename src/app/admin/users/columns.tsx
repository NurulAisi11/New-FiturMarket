"use client"

import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { updateUserRole } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { useTransition } from "react"

const RoleChanger = ({ user }: { user: User }) => {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const handleRoleChange = (newRole: "admin" | "user") => {
    startTransition(async () => {
      const result = await updateUserRole(user.id, newRole)
      if (result.error) {
        toast({ title: "Gagal", description: result.error, variant: "destructive" })
      } else if (result.success) {
        toast({ title: "Berhasil", description: result.success })
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Buka menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ubah Peran</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={isPending || user.role === 'admin'} onClick={() => handleRoleChange('admin')}>Jadikan Admin</DropdownMenuItem>
        <DropdownMenuItem disabled={isPending || user.role === 'user'} onClick={() => handleRoleChange('user')}>Jadikan Pengguna</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Nama <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Peran",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      const variant = role === "admin" ? "default" : "secondary"
      return <Badge variant={variant}>{role}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <RoleChanger user={row.original} />,
  },
]