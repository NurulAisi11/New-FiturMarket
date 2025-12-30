import { User } from "@/lib/types"

export const users: User[] = [
  {
    id: "1",
    name: "Admin Nurul",
    email: "admin@example.com",
    password: "password_admin", // Di aplikasi nyata, ini adalah hash
    role: "admin",
  },
  {
    id: "2",
    name: "Aisi User",
    email: "aisi@example.com",
    password: "password_user",
    role: "user",
  },
]