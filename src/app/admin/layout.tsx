"use client"

import { type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package2, Home, ShoppingCart, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const navLinkClasses = (href: string) =>
    cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
      pathname === href && "bg-muted text-primary"
    )

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Admin Panel</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/admin/dashboard"
                className={navLinkClasses("/admin/dashboard")}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link href="/admin/products" className={navLinkClasses("/admin/products")}>
                <ShoppingCart className="h-4 w-4" />
                Produk
              </Link>
              <Link href="/admin/users" className={navLinkClasses("/admin/users")}>
                <Users className="h-4 w-4" />
                Pengguna
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          {/* Header bisa ditambahkan search bar atau profile dropdown nanti */}
          <div className="w-full flex-1">
            {/* Kosong untuk saat ini */}
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
