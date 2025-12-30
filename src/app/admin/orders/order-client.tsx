
"use client";

import { Order } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getColumns } from "./columns";
import { DataTable } from "@/components/data-table";

interface OrderClientProps {
  orders: Order[];
}

export function OrderClient({ orders }: OrderClientProps) {
  const columns = getColumns();

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Pesanan</CardTitle>
              <CardDescription>Kelola semua pesanan di toko Anda.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={orders}
            filterColumn="id"
            filterPlaceholder="Cari ID pesanan..."
          />
        </CardContent>
      </Card>
    </>
  );
}
