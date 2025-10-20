"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { CreditCard, User, Mail, Home } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus minimal 2 karakter." }),
  email: z.string().email({ message: "Masukkan email yang valid." }),
  address: z.string().min(10, { message: "Alamat harus minimal 10 karakter." }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Nomor kartu harus 16 digit." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Gunakan format MM/YY." }),
  cvc: z.string().regex(/^\d{3}$/, { message: "CVC harus 3 digit." }),
})

export function CheckoutForm() {
  const { clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitting order:", values)
    toast({
      title: "Pembayaran Berhasil Diproses",
      description: "Terima kasih! Anda akan diarahkan ke halaman konfirmasi pesanan.",
    })
    // Tidak perlu clearCart() di sini karena halaman success akan melakukannya
    router.push("/checkout/success")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Selesaikan Pesanan Anda</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informasi Pengiriman</h3>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="John Doe" {...field} className="pl-10" />
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="anda@example.com" {...field} className="pl-10" />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Pengiriman</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Jl. Sudirman No. 123, Jakarta" {...field} className="pl-10" />
                        <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Detail Pembayaran (Mock)</h3>
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Kartu</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="**** **** **** ****" {...field} className="pl-10" />
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kedaluwarsa</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVC</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" className="w-full text-lg py-6">
              Bayar Sekarang
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
