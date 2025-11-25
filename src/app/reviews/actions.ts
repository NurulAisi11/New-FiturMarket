
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addReview(
  productId: string,
  rating: number,
  comment: string
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to add a review." };
  }

  // In a real application, you would also check if the user has purchased the product.
  // For simplicity, we are skipping that check here.

  const { error } = await supabase.from("reviews").insert({
    product_id: productId,
    user_id: user.id,
    rating,
    comment,
  });

  if (error) {
    console.error("Error adding review:", error);
    return { error: "Failed to add review." };
  }

  revalidatePath(`/product/${productId}`);
  return { success: true };
}

export async function getReviews(productId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reviews")
        .select("*, user:profiles(name)")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching reviews:", error);
        return { error: "Failed to fetch reviews." };
    }
    return { reviews: data };
}
