
"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function getChatSession(productId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { data: chat, error } = await supabase
      .from("chats")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .single();

    if (chat) {
      return { chat_id: chat.id };
    }

    const { data: newChat, error: newChatError } = await supabase
      .from("chats")
      .insert({ user_id: user.id, product_id: productId })
      .select("id")
      .single();

    if (newChatError) {
      console.error("Error creating chat session:", newChatError);
      return { error: "Failed to create chat session" };
    }
    return { chat_id: newChat.id };
  } else {
    const guestId = cookies().get("guest_id")?.value;
    if (guestId) {
      const { data: chat, error } = await supabase
        .from("chats")
        .select("id")
        .eq("guest_id", guestId)
        .eq("product_id", productId)
        .single();

      if (chat) {
        return { chat_id: chat.id };
      }
    }

    const newGuestId = crypto.randomUUID();
    const { data: newChat, error: newChatError } = await supabase
      .from("chats")
      .insert({ guest_id: newGuestId, product_id: productId })
      .select("id")
      .single();

    if (newChatError) {
      console.error("Error creating chat session:", newChatError);
      return { error: "Failed to create chat session" };
    }
    cookies().set("guest_id", newGuestId);
    return { chat_id: newChat.id };
  }
}

export async function getMessages(chatId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching messages:", error);
    return { error: "Failed to fetch messages" };
  }
  return { messages: data };
}

export async function sendMessage(chatId: string, content: string, sender: "user" | "store") {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("messages")
    .insert({ chat_id: chatId, content, sender });

  if (error) {
    console.error("Error sending message:", error);
    return { error: "Failed to send message" };
  }
  return { success: true };
}
