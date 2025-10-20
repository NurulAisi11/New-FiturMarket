import { createClient } from "@/lib/supabase/server"
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

export default async function UsersPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user?.user_metadata?.role !== 'admin') {
    return (
      <Card className="text-center p-8">
        <CardHeader>
          <CardTitle className="text-destructive">Akses Ditolak</CardTitle>
          <CardDescription>Anda tidak memiliki izin untuk mengakses halaman ini.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

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