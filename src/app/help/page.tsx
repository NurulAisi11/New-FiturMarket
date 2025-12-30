"use client"

import { Header } from "@/components/header"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Mail, Phone } from "lucide-react"

const faqs = [
  {
    question: "Bagaimana cara melacak pesanan saya?",
    answer: "Anda dapat melacak pesanan Anda dengan mengunjungi halaman 'Lacak Pesanan' dan memasukkan ID pesanan Anda. Anda juga bisa menemukan link pelacakan di halaman 'Pesanan Saya' setelah login.",
  },
  {
    question: "Berapa lama waktu pengiriman?",
    answer: "Waktu pengiriman bervariasi tergantung lokasi Anda. Estimasi standar adalah 2-5 hari kerja untuk wilayah Jabodetabek dan 4-10 hari kerja untuk luar Jabodetabek. Anda dapat melihat estimasi yang lebih akurat saat checkout.",
  },
  {
    question: "Apa saja metode pembayaran yang diterima?",
    answer: "Kami menerima berbagai metode pembayaran, termasuk kartu kredit (Visa, MasterCard), transfer bank virtual account, dan dompet digital (GoPay, OVO, Dana).",
  },
  {
    question: "Bagaimana cara mengembalikan produk?",
    answer: "Kami menawarkan garansi pengembalian 7 hari untuk produk yang rusak atau tidak sesuai. Silakan hubungi layanan pelanggan kami dengan menyertakan ID pesanan dan foto produk untuk memulai proses pengembalian.",
  },
  {
    question: "Apakah produk di FiturMarket original?",
    answer: "Ya, kami menjamin semua produk yang dijual di FiturMarket adalah 100% original dan berasal langsung dari produsen atau distributor resmi.",
  },
]

export default function HelpPage() {
  // Dummy functions for Header props
  const handleSearch = (term: string) => { console.log("Searching for:", term) }
  const handleImageSearch = (event: React.ChangeEvent<HTMLInputElement>) => { console.log("Image search triggered") }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header onSearch={handleSearch} onImageSearch={handleImageSearch} />
      <main className="flex-1 bg-muted/40">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl">
                  Pusat Bantuan
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Punya pertanyaan? Kami punya jawabannya. Temukan solusi cepat di sini.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-3xl px-4 md:px-6 pb-12 md:pb-24">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold">Masih butuh bantuan?</h3>
            <p className="mt-2 text-muted-foreground">Hubungi tim support kami.</p>
            <div className="mt-4 flex justify-center gap-6">
              <a href="mailto:support@fiturmarket.com" className="flex items-center gap-2 text-primary hover:underline"><Mail className="h-5 w-5" /> support@fiturmarket.com</a>
              <a href="tel:+6221500123" className="flex items-center gap-2 text-primary hover:underline"><Phone className="h-5 w-5" /> (021) 500 123</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

