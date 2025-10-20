"use client"

import type { CartItem, Product, Variant } from "@/lib/types"
import type React from "react"
import { createContext, useContext, useState, useMemo } from "react"
import { useToast } from "@/hooks/use-toast"

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product, quantity?: number, selectedVariant?: Record<string, string>) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  const addToCart = (product: Product, quantity = 1, selectedVariant?: Record<string, string>) => {
    setCartItems((prevItems) => {
      // Find item that matches both product ID and all selected variants
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id &&
          JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
      )

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prevItems, { ...product, quantity, selectedVariant }]
    })
    toast({
      title: "Ditambahkan ke keranjang",
      description: `${product.name}${
        selectedVariant ? ` (${Object.values(selectedVariant).join(", ")})` : ""
      } telah ditambahkan ke keranjang Anda.`,
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }, [cartItems])

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.discountPrice ?? item.price
      return total + price * item.quantity
    }, 0)
  }, [cartItems])

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
  }

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
