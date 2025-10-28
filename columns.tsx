"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTransition } from "react"
import { useToast } from "@/hooks/use-toast"
import { updateUserRole } from "./actions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: UserRole;
}

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

const RoleSelector = ({ userId, currentRole }: { userId: string; currentRole: UserRole }) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const onRoleChange = (newRole: UserRole) => {
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
      onValueChange={(value: UserRole) => onRoleChange(value)}
      disabled={isPending}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Pilih peran" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={USER_ROLES.ADMIN}>Admin</SelectItem>
        <SelectItem value={USER_ROLES.USER}>User</SelectItem>
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
      const role = row.getValue("role") as UserRole
      return (
        <Badge variant={role === USER_ROLES.ADMIN ? "destructive" : "secondary"}>
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