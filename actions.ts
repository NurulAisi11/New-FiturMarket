"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

interface Profile {
  id: string
  full_name: string | null
  email: string | null
  role: string
}

export async function getUsers(): Promise<{ profiles: Profile[]; error: string | null }> {
  const supabase = createClient()
  const { data, error } = await supabase.from("profiles").select("*")

  if (error) {
    console.error("Error fetching users:", error)
    return { profiles: [], error: error.message }
  }

  return { profiles: data, error: null }
}

export async function updateUserRole(
  userId: string,
  newRole: "admin" | "user"
): Promise<{ success: boolean; error: string | null }> {
  const supabase = createClient()

  const { error } = await supabase
    .from("profiles")
    .update({ role: newRole })
    .eq("id", userId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/users")
  return { success: true, error: null }
}