import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createClient } from "@/lib/supabase/server" // Ini akan menggunakan versi baru di bawah
import { cookies } from "next/headers"

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        // Saat login pertama kali, ambil role dari Supabase
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single()
        
        token.role = data?.role ?? "user" // Default ke 'user' jika tidak ada
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string ?? "user"
      }
      return session
    },
  },
  pages: { signIn: "/login" },
})