import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTable } from "@/components/data-table"
import { getUsers } from "./actions"
import { columns } from "./columns"

// Otorisasi sekarang ditangani oleh layout.tsx
export default async function UsersPage() {
  const { profiles, error } = await getUsers()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen Pengguna</CardTitle>
        <CardDescription>Kelola peran dan data pengguna di sistem Anda.</CardDescription>
      </CardHeader>
      <CardContent>
        {error
          ? <p className="text-destructive">{error}</p>
          : <DataTable columns={columns} data={profiles} filterColumn="email" filterPlaceholder="Cari email pengguna..." />
        }
      </CardContent>
    </Card>
  )
}