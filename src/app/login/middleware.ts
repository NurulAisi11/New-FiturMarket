import { NextResponse } from "next/server"
import { auth } from "@/lib/auth" // Asumsi Anda menggunakan NextAuth.js

export default auth((req) => {
  const { nextUrl } = req
  const session = req.auth

  const isAdminRoute = nextUrl.pathname.startsWith("/admin")

  // Jika pengguna mencoba mengakses rute admin tanpa peran 'admin',
  // redirect ke halaman login.
  if (isAdminRoute && session?.user?.role !== "admin") {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }
})

// Tentukan rute mana yang akan dijalankan oleh middleware ini
export const config = {
  matcher: ["/admin/:path*"],
}