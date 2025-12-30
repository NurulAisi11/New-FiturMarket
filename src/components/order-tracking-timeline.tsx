import { CheckCircle, Package, Truck, Home } from "lucide-react"
import { OrderStatus } from "@/lib/mock-orders"

interface OrderTrackingTimelineProps {
  statusHistory: OrderStatus[]
}

const statusIcons = {
  "Pesanan Dibuat": <CheckCircle className="h-5 w-5" />,
  "Diproses oleh Penjual": <Package className="h-5 w-5" />,
  "Dalam Pengiriman": <Truck className="h-5 w-5" />,
  "Tiba di Tujuan": <Home className="h-5 w-5" />,
}

export function OrderTrackingTimeline({ statusHistory }: OrderTrackingTimelineProps) {
  const activeIndex = statusHistory.length - 1

  return (
    <div className="space-y-8">
      {statusHistory.map((item, index) => (
        <div key={index} className="flex">
          <div className="flex flex-col items-center mr-4">
            <div>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  index <= activeIndex
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-muted border-muted-foreground text-muted-foreground"
                }`}
              >
                {statusIcons[item.status]}
              </div>
            </div>
            {index < statusHistory.length - 1 && (
              <div
                className={`w-px h-full ${
                  index < activeIndex ? "bg-primary" : "bg-muted-foreground"
                }`}
              />
            )}
          </div>
          <div className="pt-1">
            <p
              className={`font-semibold ${
                index <= activeIndex ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {item.status}
            </p>
            <p className="text-sm text-muted-foreground">{item.location}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(item.date).toLocaleString("id-ID", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}