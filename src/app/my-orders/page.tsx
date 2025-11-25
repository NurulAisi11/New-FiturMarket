
import Link from "next/link";
import { Header } from "@/components/header";
import { getOrders } from "@/app/checkout/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "completed":
      return "default";
    case "pending_verification":
    case "processing":
      return "secondary";
    case "pending_payment":
      return "outline";
    default:
      return "destructive";
  }
};

export default async function MyOrdersPage() {
  const { orders, error } = await getOrders();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="container mx-auto px-4 md:px-6 py-8 sm:py-12">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Riwayat Pesanan Saya</CardTitle>
              <CardDescription>
                Berikut adalah daftar semua pesanan yang pernah Anda buat. Klik
                ID Pesanan untuk melihat detail.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error ? (
                <p className="text-destructive text-center">{error}</p>
              ) : orders && orders.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Pesanan</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          <Link
                            href={`/my-orders/${order.id}`}
                            className="text-primary hover:underline"
                          >
                            {order.id}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {new Date(order.created_at).toLocaleDateString("id-ID")}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatPrice(order.total)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={getStatusVariant(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-muted-foreground">
                  Anda belum memiliki pesanan.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

