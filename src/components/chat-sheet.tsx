"use client"
 
import { useState, useRef, useEffect } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import type { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"

interface ChatSheetProps {
  product: Product
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

interface Message {
  id: number
  sender: "user" | "store"
  text: string
}

export function ChatSheet({ product, isOpen, onOpenChange }: ChatSheetProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "store", text: `Halo! Ada yang bisa dibantu terkait produk "${product.name}"?` },
  ])
  const [newMessage, setNewMessage] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: newMessage,
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate store reply
    setTimeout(() => {
      const lowerCaseMessage = userMessage.text.toLowerCase()
      let replyText = "Terima kasih atas pertanyaan Anda. Tim kami akan segera merespon untuk informasi lebih lanjut."

      if (lowerCaseMessage.includes("stok") || lowerCaseMessage.includes("ready")) {
        replyText = `Tentu, untuk produk "${product.name}", stoknya saat ini tersedia dan siap untuk dikirim. Apakah ada hal lain yang ingin ditanyakan?`
      } else if (lowerCaseMessage.includes("kirim") || lowerCaseMessage.includes("pengiriman")) {
        replyText = "Kami mendukung pengiriman ke seluruh Indonesia dengan estimasi 2-5 hari kerja. Opsi pengiriman akan tersedia saat checkout."
      } else if (lowerCaseMessage.includes("diskon") || lowerCaseMessage.includes("harga")) {
        replyText = `Harga untuk produk "${product.name}" adalah ${formatPrice(product.price)}. Untuk promo atau diskon, silakan pantau terus halaman utama kami ya!`
      } else if (lowerCaseMessage.includes("garansi")) {
        replyText = "Semua produk elektronik kami memiliki garansi resmi 1 tahun. Untuk kategori lain, syarat dan ketentuan berlaku."
      }

      const storeReply: Message = {
        id: Date.now() + 1,
        sender: "store",
        text: replyText,
      }
      setMessages((prev) => [...prev, storeReply])
    }, 1000)
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Chat dengan Toko</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-grow -mx-6 px-6" ref={scrollAreaRef}>
          <div className="space-y-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'store' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>T</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xs rounded-lg p-3 text-sm ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <SheetFooter>
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ketik pesan Anda..."
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
