"use client"

import { useState, type ReactNode } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/toast"
import { productSchema, type ProductFormValues } from "@/lib/schemas"
import { saveProduct, type Product } from "./actions"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronsUpDown, PlusCircle, Trash2 } from "lucide-react"

interface ProductDialogProps {
  product?: Product
  children: ReactNode
}

export function ProductDialog({ product, children }: ProductDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  const isEditMode = !!product

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: product?.id,
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      stock: product?.stock ?? 0,
      category: product?.category ?? "",
      imageUrl: product?.imageUrl ?? "",
      moq: product?.moq ?? 1,
      wholesale_pricing: product?.wholesale_pricing ?? [],
      qualityPassport: {
        origin: product?.qualityPassport?.origin ?? "",
        materials: product?.qualityPassport?.materials?.join("\n") ?? "",
        manufacturingProcess: product?.qualityPassport?.manufacturingProcess ?? "",
        certifications: product?.qualityPassport?.certifications?.join("\n") ?? "",
      },
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "wholesale_pricing",
  });

  const onSubmit = async (data: ProductFormValues) => {
    const qualityPassport = data.qualityPassport ? {
        ...data.qualityPassport,
        materials: data.qualityPassport.materials?.split("\n").filter(m => m.trim() !== ""),
        certifications: data.qualityPassport.certifications?.split("\n").filter(c => c.trim() !== ""),
    } : undefined;
    
    const { success, error } = await saveProduct({ ...data, qualityPassport });
    if (success) {
      toast({
        title: "Sukses!",
        description: `Produk berhasil ${isEditMode ? "diperbarui" : "ditambahkan"}.`,
      })
      setIsOpen(false)
      form.reset()
    } else {
      toast({
        title: "Gagal",
        description: error || "Terjadi kesalahan.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Produk (Grosir)" : "Tambah Produk Baru (Grosir)"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Perbarui detail produk di bawah ini." : "Isi detail untuk produk baru."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[80vh] overflow-y-auto p-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Produk</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl><Textarea {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Harga Satuan (Eceran)</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="moq"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Minimum Order Quantity (MOQ)</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stok</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Gambar</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Collapsible>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between">
                    Harga Grosir (Opsional)
                    <ChevronsUpDown className="h-4 w-4" />
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 p-4 border rounded-md">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-4">
                            <FormField
                                control={form.control}
                                name={`wholesale_pricing.${index}.min_quantity`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Min. Kuantitas</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`wholesale_pricing.${index}.price_per_unit`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Harga per Unit</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button variant="ghost" size="icon" onClick={() => remove(index)} className="mt-8">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ min_quantity: 0, price_per_unit: 0 })}
                    >
                    <PlusCircle className="h-4 w-4 mr-2" /> Tambah Tingkat Harga
                    </Button>
                </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between">
                  Quality Passport (Opsional)
                  <ChevronsUpDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 p-4 border rounded-md">
                <FormField
                  control={form.control}
                  name="qualityPassport.origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asal</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="qualityPassport.materials"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material (satu per baris)</FormLabel>
                      <FormControl><Textarea {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="qualityPassport.manufacturingProcess"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proses Manufaktur</FormLabel>
                      <FormControl><Textarea {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="qualityPassport.certifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sertifikasi (satu per baris)</FormLabel>
                      <FormControl><Textarea {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CollapsibleContent>
            </Collapsible>

            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}