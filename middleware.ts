import { NextResponse } from "next/server"
import { auth } from "./src/lib/auth"

export default auth((req) => {
  const { nextUrl } = req
  const session = req.auth
  const isAdminRoute = nextUrl.pathname.startsWith("/admin")

  // Log untuk debugging
  console.log("Middleware session:", JSON.stringify(session, null, 2))

  if (isAdminRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", nextUrl))
    }
    if (session.user?.role !== "admin") {
      // Redirect ke halaman utama jika bukan admin. Bisa juga ke halaman /403 (akses ditolak).
      return NextResponse.redirect(new URL("/", nextUrl))
    }
  }
})

export const config = {
  matcher: ["/admin/:path*"],
}