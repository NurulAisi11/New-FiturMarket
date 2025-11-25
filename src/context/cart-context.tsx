"use client"

import type { Product } from "@/lib/types"
import type React from "react"
import { createContext, useContext, useState, useMemo } from "react"
import { useToast } from "@/hooks/use-toast"

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: Record<string, string>;
}

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

function getPriceForQuantity(product: Product, quantity: number): number {
    if (product.wholesale_pricing && product.wholesale_pricing.length > 0) {
        const sortedTiers = [...product.wholesale_pricing].sort(
            (a, b) => b.min_quantity - a.min_quantity
        );
        for (const tier of sortedTiers) {
            if (quantity >= tier.min_quantity) {
                return tier.price_per_unit;
            }
        }
    }
    return product.price;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  const addToCart = (product: Product, quantity = 1, selectedVariant?: Record<string, string>) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id &&
          JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
      )

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        const newPrice = getPriceForQuantity(product, newQuantity);
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity, price: newPrice } : item
        )
      }
      const newPrice = getPriceForQuantity(product, quantity);
      return [...prevItems, { ...product, quantity, selectedVariant, price: newPrice }]
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
    const itemToUpdate = cartItems.find((item) => item.id === productId);
    if (!itemToUpdate) return;

    if (quantity < (itemToUpdate.moq || 1)) {
        removeFromCart(productId);
        return;
    }
    
    const newPrice = getPriceForQuantity(itemToUpdate, quantity);
    setCartItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity, price: newPrice } : item)))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }, [cartItems])

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity
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
