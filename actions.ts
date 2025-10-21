"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/utils"

interface Profile {
  id: string
  full_name: string | null
  email: string | null
  role: string
}

export async function getUsers(): Promise<{ profiles: Profile[]; error: string | null }> {
  const supabase = createSupabaseServerClient()
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
  const supabase = createSupabaseServerClient()

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