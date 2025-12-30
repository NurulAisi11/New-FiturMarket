import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Membuat klien Supabase untuk digunakan di Server Components, Server Actions, dan Route Handlers.
 * Fungsi ini bersifat async dan harus di-await.
 * @returns Klien Supabase yang sudah terotentikasi.
 */
export async function createClient() {
  // Wajib di-await di Next.js 14+
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Adaptor async yang kompatibel dengan Next.js 14+
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // Mengatur cookies bisa gagal saat SSR streaming, ini bisa diabaikan.
          }
        },
      },
    },
  )
}
