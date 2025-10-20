"use server"

import { revalidatePath } from "next/cache"
import { users as mockUsers } from "@/lib/users"
import { User } from "@/lib/types"

// Di aplikasi nyata, ini akan menjadi panggilan database.
let users: User[] = [...mockUsers]

export async function getUsers() {
  // Simulasi pengambilan data dari DB
  return { users }
}

export async function updateUserRole(userId: string, newRole: "admin" | "user") {
  const userIndex = users.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    return { error: "Pengguna tidak ditemukan." }
  }

  // Jangan biarkan admin terakhir menghapus perannya sendiri
  const adminCount = users.filter((u) => u.role === "admin").length
  if (adminCount === 1 && users[userIndex].role === "admin" && newRole === "user") {
    return { error: "Tidak dapat mengubah peran admin terakhir." }
  }

  users[userIndex].role = newRole
  revalidatePath("/admin/users")
  return { success: `Peran untuk ${users[userIndex].name} berhasil diubah.` }
}