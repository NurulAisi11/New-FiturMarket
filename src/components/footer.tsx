import Link from "next/link"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo />
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm font-medium">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Beranda
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              Tentang Kami
            </Link>
            <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
              Bantuan
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} FiturMarket. Semua Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}