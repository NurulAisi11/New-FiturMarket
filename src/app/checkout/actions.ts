
"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { CartItem } from "@/context/cart-context";

export async function createOrder(
  cartItems: CartItem[],
  total: number,
  shippingAddress: any
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const guestId = user ? null : cookies().get("guest_id")?.value;

  // 1. Create a hold on the stock
  const holdPromises = cartItems.map((item) => {
    return supabase.from("holds").insert({
      product_id: item.id,
      quantity: item.quantity,
      expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    });
  });

  const holdResults = await Promise.all(holdPromises);
  const holdErrors = holdResults.filter((result) => result.error);

  if (holdErrors.length > 0) {
    console.error("Error creating stock hold:", holdErrors);
    return { error: "Failed to reserve stock" };
  }

  // 2. Create the order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user?.id,
      guest_id: guestId,
      total,
      shipping_address: shippingAddress,
    })
    .select("id")
    .single();

  if (orderError) {
    console.error("Error creating order:", orderError);
    // Rollback stock hold
    const rollbackPromises = holdResults.map((result) => {
      if (result.data) {
        return supabase.from("holds").delete().eq("id", result.data[0].id);
      }
      return Promise.resolve();
    });
    await Promise.all(rollbackPromises);
    return { error: "Failed to create order" };
  }

  // 3. Create the order items
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: orderItemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (orderItemsError) {
    console.error("Error creating order items:", orderItemsError);
    // Rollback order and stock hold
    await supabase.from("orders").delete().eq("id", order.id);
    const rollbackPromises = holdResults.map((result) => {
      if (result.data) {
        return supabase.from("holds").delete().eq("id", result.data[0].id);
      }
      return Promise.resolve();
    });
    await Promise.all(rollbackPromises);
    return { error: "Failed to create order items" };
  }
  
  // 4. Clear the cart
  // This should be done on the client-side after successful redirection.

  return { orderId: order.id };
}

export async function uploadProofOfPayment(orderId: string, formData: FormData) {
  const supabase = createClient();
  const file = formData.get("file") as File;

  if (!file) {
    return { error: "No file provided" };
  }

  const fileName = `${orderId}/${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from("proof-of-payment")
    .upload(fileName, file);

  if (uploadError) {
    console.error("Error uploading proof of payment:", uploadError);
    return { error: "Failed to upload proof of payment" };
  }

  const { data } = supabase.storage
    .from("proof-of-payment")
    .getPublicUrl(fileName);

  const { error: updateError } = await supabase
    .from("orders")
    .update({
      proof_of_payment_url: data.publicUrl,
      status: "pending_verification",
    })
    .eq("id", orderId);

  if (updateError) {
    console.error("Error updating order status:", updateError);
    return { error: "Failed to update order status" };
  }

  return { success: true };
}

export async function getOrder(orderId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))")
        .eq("id", orderId)
        .single();

    if (error) {
        console.error("Error fetching order:", error);
        return { error: "Failed to fetch order" };
    }
    return { order: data };
}

export async function getOrders() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "You must be logged in to view your orders" };
    }

    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching orders:", error);
        return { error: "Failed to fetch orders" };
    }
    return { orders: data };
}
