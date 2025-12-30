
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getOrders } from "./actions";
import { OrderClient } from "./order-client";

// Otorisasi sekarang ditangani oleh layout.tsx
export default async function OrdersPage() {
  const { orders, error } = await getOrders();

  if (error) {
    return (
      <Card className="text-center p-8">
        <CardHeader>
          <CardTitle className="text-destructive">
            Gagal memuat pesanan
          </CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return <OrderClient orders={orders || []} />;
}
