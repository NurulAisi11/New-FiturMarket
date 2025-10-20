 "use client"
 
 import { useEffect } from "react"
 import Link from "next/link"
 import { Button } from "@/components/ui/button"
 import { useCart } from "@/context/cart-context"
 import { CheckCircle2 } from "lucide-react"
 
 export default function CheckoutSuccessPage() {
   const { clearCart } = useCart()
 
   // Hapus item dari keranjang saat halaman ini dimuat
   useEffect(() => {
     clearCart()
   }, []) // eslint-disable-line react-hooks/exhaustive-deps
 
   return (
     <div className="flex flex-col min-h-screen items-center justify-center bg-background text-center p-4">
       <div className="max-w-md">
         <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
         <h1 className="text-3xl font-bold mb-4">Pesanan Berhasil!</h1>
         <p className="text-muted-foreground mb-8">
           Terima kasih telah berbelanja di FiturMarket. Kami telah menerima pesanan Anda dan akan segera memprosesnya.
         </p>
         <Button asChild size="lg">
           <Link href="/">Kembali ke Beranda</Link>
         </Button>
       </div>
     </div>
   )
 }