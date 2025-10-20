import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUsers } from "./actions"
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"

export default async function UsersPage() {
  const { users } = await getUsers()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen Pengguna</CardTitle>
        <CardDescription>Lihat dan kelola peran pengguna di sistem Anda.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={users}
          filterColumn="name"
          filterPlaceholder="Cari berdasarkan nama..."
        />
      </CardContent>
    </Card>
  )
}
