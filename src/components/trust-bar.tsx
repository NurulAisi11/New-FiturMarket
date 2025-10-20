import { Truck, Lock, CircleDollarSign, BadgeCheck } from "lucide-react"

const trustPoints = [
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: "Pengiriman Cepat",
    subtitle: "Khusus area terdekat",
  },
  {
    icon: <Lock className="h-8 w-8 text-primary" />,
    title: "Pembayaran Aman",
    subtitle: "100% terjamin & terenkripsi",
  },
  {
    icon: <CircleDollarSign className="h-8 w-8 text-primary" />,
    title: "Garansi 7 Hari",
    subtitle: "Uang kembali",
  },
  {
    icon: <BadgeCheck className="h-8 w-8 text-primary" />,
    title: "100% Produk Original",
    subtitle: "Langsung dari produsen",
  },
]

export function TrustBar() {
  return (
    <div className="border-y bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 py-6">
          {trustPoints.map((point, index) => (
            <div key={index} className="flex items-center gap-4 justify-center md:justify-start">
              <div className="flex-shrink-0">{point.icon}</div>
              <div>
                <p className="font-semibold text-sm md:text-base">{point.title}</p>
                <p className="text-xs text-muted-foreground">{point.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

