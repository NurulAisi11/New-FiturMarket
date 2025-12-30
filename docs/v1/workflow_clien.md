

# 👥 Fitur Market — Workflow Client / User Flow

---

> Dokumen ini menjelaskan **alur UX, validasi, dan kontrak interaksi** sisi pengguna (client) untuk **Fitur Market** di bawah **Genexist Indonesia** — marketplace modern berbasis **Next.js 14 (App Router)** + **Supabase** dengan fitur **AI Product Recommendations**, **pencarian & filter**, **chat dengan toko**, dan **cek ongkir** real-time (sesuai blueprint proyek).

---

## 0️⃣ Terminologi & Status Dasar

| Status                 | Deskripsi                                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **CART**               | Item ditambahkan ke keranjang pengguna (anonim atau login).                                                       |
| **HOLD**               | Stok “ditahan” sementara setelah pengguna lanjut ke checkout (TTL 10–15 menit) menggunakan **cart-token** anonim. |
| **PENDING_PAYMENT**    | Pesanan dibuat; menunggu konfirmasi pembayaran (manual atau gateway).                                             |
| **PAID**               | Pembayaran berhasil diverifikasi.                                                                                 |
| **PROCESSING**         | Penjual memproses pesanan (packing).                                                                              |
| **SHIPPED**            | Pesanan telah dikirim (resi tersedia).                                                                            |
| **COMPLETED**          | Pesanan diterima pengguna.                                                                                        |
| **CANCELED / EXPIRED** | Batal oleh pengguna/admin atau **HOLD** kadaluarsa sebelum bayar.                                                 |

> Aturan utama: aksi sensitif (konfirmasi harga/ongkir, kuota stok) hanya valid selama **HOLD** aktif. Setelah TTL habis, pengguna harus mengulang konfirmasi.

---

## 1️⃣ Alur UX (Client Journey)

### 1. Landing / Beranda

* Grid **produk** dengan **Pencarian**, **Filter Kategori**, **Sortir (relevansi/harga)**, dan **AI Recommendations** personal.
* Banner CTA: “Belanja Cerdas dengan Rekomendasi AI”.

### 2. Halaman Detail Produk

* Foto, deskripsi, harga, stok, variasi, rating/review, estimasi ongkir.
* Komponen **Chat with Store** (sheet) untuk tanya produk.
* CTA: **Tambah ke Keranjang**.

### 3. Keranjang (Cart)

* Daftar item, kuantitas, subtotal.
* Estimasi ongkir (cek kode pos/kota).
* CTA: **Checkout** → buat/lanjutkan **cart-token** anonim jika belum login.

### 4. Checkout

* Alamat & opsi pengiriman; ringkasan biaya (produk + ongkir).
* Saat **Bayar / Buat Pesanan** → sistem membuat **HOLD (TTL 10–15 menit)** dan **Order Draft**.
* Opsi pembayaran:

  * **Manual** (instruksi transfer/QRIS + unggah bukti), atau
  * **Gateway** (redirect Midtrans/Xendit/Stripe, mock/nyata).

### 5. Konfirmasi & Status Pesanan

* Halaman status dengan badge besar (**PENDING_PAYMENT / PAID / PROCESSING / SHIPPED / COMPLETED / CANCELED / EXPIRED**).
* Menampilkan **invoice (PDF)**, **resi**, dan **tracking** jika tersedia.
* Notifikasi email/WA opsional; tombol **Hubungi Toko**.

---

## 2️⃣ Validasi Input

| Field                          | Aturan                      | Catatan                                     |
| ------------------------------ | --------------------------- | ------------------------------------------- |
| **Nama Penerima**              | ≥ 3 karakter                | Hanya huruf, spasi, tanda baca umum         |
| **Telepon/WA**                 | Format internasional `+62…` | Normalisasi dari `08…` → `+628…`            |
| **Alamat**                     | Wajib, 10–240 karakter      | Simpan terstruktur (provinsi/kota/kode pos) |
| **Catatan**                    | Maks 120 karakter           | Ditampilkan ringkas (ellipsis)              |
| **Upload Bukti** (opsi manual) | JPG/PNG/PDF ≤ 10 MB         | Validasi mimetype & ukuran di server        |
| **Kuantitas**                  | 1–999                       | Cek stok server-side saat HOLD              |

---

## 3️⃣ Kebijakan Stok & HOLD

* **capacityUsed** = jumlah unit yang telah **PAID** + **PROCESSING** + **SHIPPED** (opsional tambahkan **REVIEW/PENDING_PAYMENT** jika stok ketat).
* **holdActive** = unit di **HOLD** (TTL aktif).
* **holdPool** default maksimal **30%** dari stok yang tersedia.
* Jika **holdPool** penuh → tampilkan *“Antrean penuh, coba lagi beberapa saat.”*
* HOLD dibersihkan via **scheduler** (cron) tiap 1–2 menit.

---

## 4️⃣ Model Data (Ringkas)

| Entity          | Kolom Penting                                                                            | Catatan                            |
| --------------- | ---------------------------------------------------------------------------------------- | ---------------------------------- |
| **Product**     | id, name, price, stock, category, imageUrl, variants, reviews                            | Sumber utama katalog               |
| **Cart**        | cartToken, items[{productId, qty, priceAtAdd}], subtotal                                 | cartToken anonim (cookie HttpOnly) |
| **Order**       | id, userId?, cartToken, state, address, shippingMethod, shippingFee, amount, paymentMode | State machine utama                |
| **Payment**     | orderId, method, status, proofUrl?, gatewayRef                                           | Manual/gateway                     |
| **Shipment**    | orderId, courier, trackingNo, status                                                     | Untuk tracking                     |
| **ChatMessage** | userId/cartToken, productId, role, message, createdAt                                    | Riwayat chat toko                  |

> Semua waktu di **UTC**; UI mengonversi ke zona lokal (WIB).

---

## 5️⃣ Kontrak Interaksi (App Router + Server Actions)

> **Catatan:** Fitur inti memanfaatkan **Server Actions** untuk keamanan (role/validasi) dan boleh diekspos **route handler** untuk pembacaan publik.

### Public (GET)

* `/api/products` — daftar produk + filter/sort.
* `/api/products/:id` — detail & stok saat ini.
* `/api/shipping/quote` — estimasi ongkir berdasar lokasi & berat (mock/nyata).

### Client / Cart & Order

* `cart.createOrGet()` (SA) — buat/ambil **cart-token** anonim.
* `cart.addItem(payload)` (SA) — tambah item; verifikasi stok.
* `checkout.createHold(orderDraft)` (SA) — buat **HOLD (TTL)** + re-cek harga/ongkir.
* `payment.submitProof(formData)` (SA) — unggah bukti (mode manual).
* `order.getStatus(code)` (GET/SA) — status real-time (poll/SSE).

> Gunakan **Idempotency-Key** pada setiap POST sensitif dan **rate-limit** per IP/user.

---

## 6️⃣ Perhitungan Stok (tanpa cache wajib)

```
paid = sum(qty where state ∈ {PAID, PROCESSING, SHIPPED})
holdActive = sum(qty where state = HOLD and now < holdExpiresAt)

capacityLeft = product.stock - paid
holdPoolLeft = floor(product.stock * 0.3) - holdActive
```

> Cache opsional (TTL 15–30 dtk). **Prioritaskan correctness** dibanding speed.

---

## 7️⃣ State Machine Pesanan

| Event                           | Guard                           | Transition           |
| ------------------------------- | ------------------------------- | -------------------- |
| Create HOLD                     | holdPoolLeft>0 & capacityLeft>0 | → HOLD               |
| Submit Payment (manual/gateway) | state=HOLD & now<holdExpiresAt  | → PENDING_PAYMENT    |
| Verify Payment                  | payment.status=success          | → PAID               |
| Start Fulfillment               | state=PAID                      | → PROCESSING         |
| Ship Order                      | resi generated                  | → SHIPPED            |
| Confirm Delivered               | user confirm / auto after T+N   | → COMPLETED          |
| Cancel / Expire                 | user/admin cancel / TTL habis   | → CANCELED / EXPIRED |

---

## 8️⃣ Komponen UI (Client)

| Komponen          | Deskripsi                                        |
| ----------------- | ------------------------------------------------ |
| **ProductGrid**   | Daftar produk + filter/sort + AI Recommendations |
| **ProductDetail** | Deskripsi lengkap + stok + cek ongkir            |
| **CartSheet**     | Ringkas cart dengan qty & subtotal               |
| **CheckoutForm**  | Alamat, pengiriman, ringkasan biaya              |
| **PaymentPanel**  | Countdown HOLD + instruksi / redirect gateway    |
| **Uploader**      | Preview + progress + validasi                    |
| **OrderStatus**   | Badge status + invoice + tracking                |
| **ChatSheet**     | Tanya produk, riwayat chat kontekstual           |

> Gunakan **shadcn/ui** dan **Framer Motion** untuk interaksi yang responsif dan halus.

---

## 9️⃣ Observability & Metrics

* **Log** perubahan status: `order_id`, `state_from→to`, `ipHash`, `cartToken/userId`.
* **Metrics utama:**

  * `holds_created`, `holds_expired`, `conversion_rate`,
  * `abandon_cart_rate`, `avg_checkout_time`,
  * `proofs_uploaded` (mode manual).
* **Alerting:** lonjakan `EXPIRED/CANCELED`, mismatch stok, error upload.

---

## 🔟 Integrasi & Future Upgrade

| Fitur                | Tujuan                     | Catatan                        |
| -------------------- | -------------------------- | ------------------------------ |
| **Login (opsional)** | Personalisasi & histori    | Toggle `FEATURE_REQUIRE_LOGIN` |
| **Payment Gateway**  | Otomatisasi pembayaran     | Webhook → auto-capture         |
| **Multi-address**    | Banyak alamat per pengguna | Tabel `addresses`              |
| **Voucher/Promo**    | Diskon & bundling          | Validasi server-side           |
| **Realtime Chat**    | Chat toko real-time        | Supabase Realtime              |
| **AI Explain**       | Alasan rekomendasi         | Transparansi AI (opt-in)       |

---

## 11️⃣ Validasi, Security, & Aksesibilitas

* Semua payload diverifikasi via **Zod** (client & server).
* **CSRF** untuk form non-idempotent; cookie **HttpOnly** untuk **cart-token**.
* Upload disanitasi; gambar di-hash & EXIF dihapus.
* **Cron expiry** untuk membersihkan **HOLD**.
* Fokus ring aktif; **prefers-reduced-motion** dihormati; minimum font 16px.

---

## 12️⃣ Checklist Implementasi

1. Grid produk (search, filter, sort) + AI Recommendations.
2. Detail produk + cek ongkir.
3. Cart + **cart-token** anonim.
4. Checkout → **HOLD (TTL)** + ringkasan biaya.
5. Pembayaran (manual/gateway) + upload bukti (opsional).
6. Halaman status order (polling/SSE) + invoice PDF.
7. Chat dengan toko (persisten).
8. Scheduler expiry & logging/metrics.

---

## 13️⃣ ENV & Konfigurasi

* `NEXT_PUBLIC_TZ=Asia/Jakarta`
* `NEXT_PUBLIC_AI_RECS=true|false`
* `PAYMENT_MODE=manual|gateway`
* `SUPABASE_URL=…` / `SUPABASE_ANON_KEY=…`
* `NEXT_PRIVATE_SUPABASE_SERVICE_ROLE=…`
* `FEATURE_REQUIRE_LOGIN=true|false`

---

## 14️⃣ Catatan Akhir

Alur **Fitur Market** menyeimbangkan **UX cepat** dengan **integritas data tinggi**.
Setiap aksi penting bersifat idempotent, setiap status bisa diaudit, dan setiap interaksi aman secara default.

📅 **Terakhir Diperbarui:** 24 Okt 2025
📍 **Penanggung Jawab UX:** Client Lead — Genexist Indonesia

> “Experience isn’t just what users see — it’s how reliably the system keeps its promises.”
> *— Fitur Market UX Playbook* ✨

---
