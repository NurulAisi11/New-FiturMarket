import { Suspense } from "react"
import { CheckoutContent } from "./checkout-content"
 
export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<CheckoutLoading />}>
        <CheckoutContent />
      </Suspense>
    </div>
  )
}

function CheckoutLoading() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center text-center p-4">
      <h1 className="text-2xl font-bold">Memuat Checkout...</h1>
    </div>
  )
}