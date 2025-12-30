"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { signUp } from "@/lib/auth/actions"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus minimal 2 karakter." }),
  email: z.string().email({ message: "Masukkan email yang valid." }),
  password: z.string().min(8, { message: "Password harus minimal 8 karakter." }),
})

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const result = await signUp(values)
    setIsLoading(false)

    if (result?.error) {
      toast({
        title: "Registrasi Gagal",
        description: result.error.message,
        variant: "destructive",
      })
    } else if (result?.success) {
      toast({
        title: "Registrasi Berhasil!",
        description: "Silakan cek email Anda untuk verifikasi akun.",
      })
      setIsSuccess(true)
      form.reset()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Logo />
          </div>
          <CardTitle>Buat Akun Baru</CardTitle>
          <CardDescription>Daftar untuk mulai berbelanja.</CardDescription>
        </CardHeader>
        {isSuccess ? (
          <CardContent>
            <div className="text-center p-4 bg-green-100 text-green-800 rounded-md">
              <h3 className="font-bold">Verifikasi Email Anda</h3>
              <p className="text-sm">Kami telah mengirimkan link verifikasi ke email Anda. Silakan cek kotak masuk (dan folder spam) untuk melanjutkan.</p>
            </div>
          </CardContent>
        ) : (
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Nama Lengkap</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="anda@example.com" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isLoading ? "Mendaftar..." : "Daftar"}
              </Button>
            </form>
          </Form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Sudah punya akun? <Link href="/login" className="font-semibold text-primary hover:underline">Masuk di sini</Link>
          </p>
        </CardContent>
        )}
      </Card>
    </div>
  )
}
