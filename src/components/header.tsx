"use client"
import * as React from "react"
import Link from "next/link"
import { Search, Camera, Package, ListOrdered } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { ShoppingCart } from "@/components/shopping-cart"
import { Button } from "./ui/button"
import LogoutButton from "@/components/logoutbutton";

interface HeaderProps {
  onSearch: (term: string) => void
  onImageSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Header({ onSearch, onImageSearch }: HeaderProps) {
  const [internalSearchTerm, setInternalSearchTerm] = React.useState("")
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari produk..."
              className="w-full pl-10"
              value={internalSearchTerm}
              onChange={(e) => {
                setInternalSearchTerm(e.target.value)
                onSearch(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/my-orders" aria-label="Pesanan Saya">
              <ListOrdered className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/track-order" aria-label="Lacak Pesanan">
              <Package className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <label htmlFor="image-upload-header" className="cursor-pointer">
              <Camera className="h-5 w-5" />
              <input id="image-upload-header" type="file" className="sr-only" accept="image/*" onChange={onImageSearch} />
            </label>
          </Button>
          <ShoppingCart />
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}
