
import { getOrder } from "@/app/checkout/actions";
import { notFound } from "next/navigation";
import { AdminOrderDetailsClient } from "./order-details-client";

export default async function AdminOrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const orderId = params.id;
  const { order, error } = await getOrder(orderId);

  if (error || !order) {
    notFound();
  }

  return <AdminOrderDetailsClient order={order} />;
}
