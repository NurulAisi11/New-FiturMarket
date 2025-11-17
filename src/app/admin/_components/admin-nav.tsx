"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Home, Package, Users } from 'lucide-react'
import { cn } from "@/lib/utils"

export function AdminNav() {
  const pathname = usePathname()

  const navLinkClasses = (href: string) =>
    cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
      pathname.startsWith(href) && "bg-muted text-primary"
    )

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link href="/admin" className={navLinkClasses("/admin")}>
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link href="/admin/products" className={navLinkClasses("/admin/products")}>
        <Package className="h-4 w-4" />
        Products
      </Link>
      <Link href="/admin/users" className={navLinkClasses("/admin/users")}>
        <Users className="h-4 w-4" />
        Users
      </Link>
    </nav>
  )
}