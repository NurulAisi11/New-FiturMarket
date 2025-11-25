
import { getOrder } from "@/app/checkout/actions";
import { notFound } from "next/navigation";
import { OrderDetailsClient } from "./order-details-client";

export default async function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const orderId = params.id;
  const { order, error } = await getOrder(orderId);

  if (error || !order) {
    notFound();
  }

  return <OrderDetailsClient order={order} />;
}
