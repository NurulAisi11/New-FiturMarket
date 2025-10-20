"use client"

import { useEffect, useState, useTransition } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2, UploadCloud } from "lucide-react"

import { useProductSheet } from "@/hooks/use-product-sheet"
import { useToast } from "@/hooks/use-toast"
import { productSchema, ProductFormValues } from "@/lib/schemas"
import { getProductById, saveProduct, uploadImage } from "./actions"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ProductForm() {
  const { isOpen, onClose, id } = useProductSheet()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      imageUrl: "",
    },
  })

  useEffect(() => {
    if (id) {
      startTransition(async () => {
        const product = await getProductById(id)
        if (product) {
          form.reset(product)
          if (product.imageUrl) {
            setImagePreview(product.imageUrl)
          }
        }
      })
    } else {
      form.reset({ name: "", description: "", price: 0, category: "", imageUrl: "" })
      setImagePreview(null)
    }
  }, [id, form, isOpen]) // Tambahkan isOpen agar form di-reset setiap kali sheet dibuka

  const onSubmit = (values: ProductFormValues) => {
    startTransition(async () => {
      const payload = id ? { ...values, id } : values
      const result = await saveProduct(payload)
      if (!result.success) {
        toast({ title: "Gagal", description: result.error, variant: "destructive" })
      } else {
        toast({ title: "Berhasil", description: `Produk berhasil ${id ? 'diperbarui' : 'ditambahkan'}.` })
        onClose()
      }
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)

    startTransition(async () => {
      const formData = new FormData()
      formData.append("file", file)
      const result = await uploadImage(formData)

      if (result.publicUrl) {
        form.setValue("imageUrl", result.publicUrl, { shouldValidate: true })
        toast({ title: "Upload Berhasil", description: "Gambar telah diunggah." })
      } else {
        setImagePreview(form.getValues("imageUrl") || null) // Kembalikan ke gambar lama jika gagal
        toast({ title: "Upload Gagal", description: result.error, variant: "destructive" })
      }
    })
  }

  const title = id ? "Edit Produk" : "Tambah Produk Baru"
  const description = id ? "Ubah detail produk Anda." : "Isi detail untuk produk baru."
  const buttonText = id ? "Simpan Perubahan" : "Tambahkan Produk"

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Nama Produk</FormLabel><FormControl><Input {...field} disabled={isPending} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Deskripsi</FormLabel><FormControl><Textarea {...field} disabled={isPending} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="price" render={({ field }) => (
              <FormItem><FormLabel>Harga</FormLabel><FormControl><Input type="number" {...field} disabled={isPending} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem><FormLabel>Kategori</FormLabel><FormControl><Input {...field} disabled={isPending} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="space-y-2">
              <FormLabel>Gambar Produk</FormLabel>
              <FormControl>
                <label htmlFor="image-upload" className="cursor-pointer block w-full border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  {imagePreview ? (
                    <div className="relative w-full h-40">
                      <Image src={imagePreview} alt="Pratinjau gambar" fill className="object-contain rounded-md" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <UploadCloud className="h-8 w-8" />
                      <span>Klik untuk mengunggah gambar</span>
                    </div>
                  )}
                </label>
              </FormControl>
              <Input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageUpload}
                disabled={isPending}
              />
              <FormField control={form.control} name="imageUrl" render={({ field }) => <FormItem><FormMessage /></FormItem>} />
            </div>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {buttonText}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}