"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useTransition } from "react"
import { useToast } from "@/hooks/use-toast"
import { updateUserRole } from "./actions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface Profile {
  id: string
  full_name: string | null
  email: string | null
  role: string
}

const RoleSelector = ({ userId, currentRole }: { userId: string, currentRole: string }) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const onRoleChange = (newRole: "admin" | "user") => {
    startTransition(async () => {
      const result = await updateUserRole(userId, newRole)
      if (result.success) {
        toast({ title: "Berhasil", description: "Peran pengguna telah diperbarui." })
      } else {
        toast({ title: "Gagal", description: result.error, variant: "destructive" })
      }
    })
  }

  return (
    <Select
      defaultValue={currentRole}
      onValueChange={(value: "admin" | "user") => onRoleChange(value)}
      disabled={isPending}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Pilih peran" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="user">User</SelectItem>
      </SelectContent>
    </Select>
  )
}

export const columns: ColumnDef<Profile>[] = [
  {
    accessorKey: "full_name",
    header: "Nama Lengkap",
    cell: ({ row }) => row.getValue("full_name") || "-",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Peran Saat Ini",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return (
        <Badge variant={role === 'admin' ? 'default' : 'secondary'}>
          {role}
        </Badge>
      )
    }
  },
  {
    id: "actions",
    header: "Ubah Peran",
    cell: ({ row }) => <RoleSelector userId={row.original.id} currentRole={row.original.role} />,
  },
]