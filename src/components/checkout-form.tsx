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
import { User, Mail, Home } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { createOrder } from "@/app/checkout/actions"
import { CartItem } from "@/context/cart-context"

const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus minimal 2 karakter." }),
  email: z.string().email({ message: "Masukkan email yang valid." }),
  address: z.string().min(10, { message: "Alamat harus minimal 10 karakter." }),
})

interface CheckoutFormProps {
  cartItems: CartItem[];
  total: number;
}

export function CheckoutForm({ cartItems, total }: CheckoutFormProps) {
  const { clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createOrder(cartItems, total, values);

    if (result.error) {
      toast({
        title: "Gagal Membuat Pesanan",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Pesanan Berhasil Dibuat",
        description: "Anda akan diarahkan ke halaman konfirmasi pesanan.",
      })
      clearCart()
      router.push(`/checkout/success?orderId=${result.orderId}`)
    }
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

            <Button type="submit" className="w-full text-lg py-6" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Memproses..." : "Buat Pesanan"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
