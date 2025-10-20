"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import * as z from "zod"

// This schema can be shared between the login form and this action
const formSchema = z.object({
  email: z.string().email({ message: "Masukkan email yang valid." }),
  password: z.string().min(8, { message: "Password harus minimal 8 karakter." }),
})

export async function signIn(formData: z.infer<typeof formSchema>) {
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword(formData)

  if (error) {
    // Return an error object to be displayed on the form
    return { error: { message: "Login gagal: Email atau password salah." } }
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function signUp(formData: z.infer<typeof formSchema> & { name: string }) {
  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      // You can store additional data like name here
      data: {
        full_name: formData.name,
      },
    },
  })

  if (error) {
    return { error: { message: `Registrasi gagal: ${error.message}` } }
  }

  revalidatePath("/", "layout")
  // Return a success flag to show a confirmation message
  return { success: true }
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect("/login")
}
