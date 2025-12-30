"use client"
 
import { useState, useRef, useEffect, useTransition } from "react"
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
import { Send, Loader2 } from "lucide-react"
import type { Product } from "@/lib/types"
import { getChatSession, getMessages, sendMessage } from "@/app/chat/actions"
import { createClient } from "@/lib/supabase/client"

interface ChatSheetProps {
  product: Product
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

interface Message {
  id: number;
  chat_id: string;
  content: string;
  sender: "user" | "store";
  created_at: string;
}

export function ChatSheet({ product, isOpen, onOpenChange }: ChatSheetProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [chatId, setChatId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSending, startTransition] = useTransition()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    if (isOpen) {
      const initializeChat = async () => {
        setIsLoading(true)
        setError(null)
        const session = await getChatSession(product.id)
        if (session.error || !session.chat_id) {
          setError("Gagal memulai sesi chat.")
          setIsLoading(false)
          return
        }
        
        setChatId(session.chat_id)
        
        const initialMessages = await getMessages(session.chat_id)
        if (initialMessages.error || !initialMessages.messages) {
          setError("Gagal memuat pesan.")
          setIsLoading(false)
          return
        }

        if (initialMessages.messages.length === 0) {
          const initialMessageContent = `Halo! Ada yang bisa dibantu terkait produk "${product.name}"?`;
          await sendMessage(session.chat_id, initialMessageContent, "store");
          setMessages([{ id: 0, chat_id: session.chat_id, content: initialMessageContent, sender: 'store', created_at: new Date().toISOString() }]);
        } else {
          setMessages(initialMessages.messages as Message[])
        }

        setIsLoading(false)
      }
      initializeChat()
    }
  }, [isOpen, product.id, product.name])

  useEffect(() => {
    if (!chatId) return

    const channel = supabase
      .channel(`chat:${chatId}`)
      .on<Message>(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `chat_id=eq.${chatId}` },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [chatId, supabase])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "" || !chatId || isSending) return

    const messageContent = newMessage
    setNewMessage("")

    startTransition(async () => {
      await sendMessage(chatId, messageContent, "user")
    });
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
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center text-destructive">{error}</div>
            ) : (
              messages.map((message) => (
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
                    {message.content}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        <SheetFooter>
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ketik pesan Anda..."
              disabled={isLoading || error !== null}
            />
            <Button type="submit" size="icon" disabled={isLoading || error !== null || isSending}>
              {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
