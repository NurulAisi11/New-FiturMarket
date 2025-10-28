# Dokumentasi Proyek: FiturMarket

**Versi:** 1.0.0
**Tanggal:** 26 Juli 2024

## 1. Pendahuluan

Dokumen ini berfungsi sebagai panduan teknis komprehensif untuk proyek **FiturMarket**, sebuah aplikasi e-commerce modern yang dibangun di atas platform Next.js dengan Supabase sebagai backend. Tujuannya adalah untuk memberikan pemahaman mendalam tentang arsitektur, fitur yang ada, alur kerja, serta area yang memerlukan pengembangan lebih lanjut kepada tim pengembang.

**Tujuan Aplikasi:**
- Menyediakan platform bagi pengguna untuk menjelajahi, mencari, dan membeli produk.
- Menyediakan panel admin yang aman untuk mengelola data pengguna dan produk.
- Mengimplementasikan fitur-fitur modern seperti rekomendasi AI dan pencarian visual.

---

## 2. Tumpukan Teknologi (Tech Stack)

| Kategori           | Teknologi                                                              | Keterangan                                                              |
| ------------------ | ---------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Framework**      | Next.js 14+ (App Router)                                               | Fondasi utama aplikasi dengan arsitektur React Server Components (RSC). |
| **Bahasa**         | TypeScript                                                             | Menjamin keamanan tipe dan skalabilitas kode.                           |
| **Backend & DB**   | Supabase                                                               | Digunakan untuk Autentikasi, Database (Postgres), dan Storage.          |
| **Styling**        | Tailwind CSS                                                           | Framework CSS utility-first untuk desain yang cepat dan konsisten.      |
| **Komponen UI**    | shadcn/ui, Radix UI                                                    | Pustaka komponen UI yang aksesibel dan dapat disusun.                   |
| **Manajemen State**| React Context API (`CartProvider`), React Hooks                        | Pengelolaan state sisi klien untuk keranjang belanja dan UI interaktif. |
| **Tabel Data**     | TanStack Table                                                         | Untuk menampilkan data tabular yang kompleks di panel admin.            |
| **Validasi**       | Zod                                                                    | Validasi skema untuk form dan payload Server Action.                    |
| **Formulir**       | React Hook Form (diasumsikan)                                          | Pola yang diantisipasi untuk form admin yang kompleks.                  |

---

## 3. Arsitektur & Struktur Proyek

Proyek ini mengikuti struktur standar Next.js App Router.

```
/
├── src/
│   ├── app/
│   │   ├── (public)/       # Grup rute untuk halaman yang dapat diakses publik
│   │   │   ├── page.tsx    # Halaman utama (Homepage)
│   │   │   └── help/       # Halaman bantuan (FAQ)
│   │   ├── admin/          # Grup rute yang dilindungi untuk admin
│   │   │   ├── products/   # Manajemen produk (actions.ts sudah ada, UI belum)
│   │   │   └── users/      # Manajemen pengguna (UI & actions)
│   │   ├── api/            # (Potensial) Untuk route handlers jika diperlukan
│   │   └── layout.tsx      # Layout root aplikasi
│   ├── components/         # Komponen React yang dapat digunakan kembali
│   │   ├── ui/             # Komponen dasar dari shadcn/ui
│   │   ├── header.tsx      # Header utama dengan pencarian
│   │   ├── product-grid.tsx# Grid untuk menampilkan produk
│   │   └── chat-sheet.tsx  # Komponen chat dengan toko
│   ├── context/            # Konteks React untuk state global
│   │   └── cart-context.tsx# State management untuk keranjang belanja
│   ├── lib/                # Logika bisnis, utilitas, dan skema
│   │   ├── supabase/       # Konfigurasi dan utilitas klien Supabase
│   │   ├── schemas.ts      # Skema validasi Zod
│   │   ├── products.ts     # !! PENTING: Saat ini masih menggunakan data mock !!
│   │   └── utils.ts        # Fungsi pembantu umum (cth: formatPrice)
│   └── hooks/              # Custom hooks (cth: use-toast)
└── ...
```

---

## 4. Fitur-Fitur Utama (Saat Ini)

### A. Fitur Publik (Untuk Pengguna Umum)

1.  **Halaman Utama (`/`)**:
    - **Pencarian Produk**: Berdasarkan nama produk.
    - **Filter Kategori**: Memfilter produk berdasarkan kategori yang tersedia.
    - **Sortir Produk**: Mengurutkan berdasarkan relevansi, harga tertinggi, dan terendah.
    - **Rekomendasi AI**: Menampilkan produk yang direkomendasikan (saat ini disimulasikan).
    - **Cek Ongkir**: Fitur simulasi untuk mengecek estimasi biaya dan waktu pengiriman.
    - **Data Produk**: Saat ini masih menggunakan data statis dari `src/lib/products.ts`.

2.  **Halaman Bantuan (`/help`)**:
    - Menampilkan daftar FAQ menggunakan komponen akordeon.
    - Menyediakan informasi kontak.

3.  **Chat dengan Toko**:
    - Dapat diakses melalui komponen `ChatSheet`.
    - **Logika masih disimulasikan**: Memberikan balasan otomatis berdasarkan kata kunci dalam pertanyaan pengguna.

### B. Fitur Admin (Akses Terbatas)

1.  **Manajemen Pengguna (`/admin/users`)**:
    - **Otorisasi**: Halaman dan aksi hanya dapat diakses oleh pengguna dengan peran `admin`.
    - **Tampilan**: Menampilkan daftar pengguna menggunakan `DataTable` dari TanStack Table.
    - **Aksi**: Admin dapat mengubah peran pengguna lain (antara `admin` dan `user`) secara *real-time* dari tabel.

2.  **Manajemen Produk (Backend)**:
    - **Server Actions (`/admin/products/actions.ts`)**: Logika backend untuk operasi CRUD (Create, Read, Update, Delete) produk sudah dibuat.
    - **Otorisasi**: Semua aksi dilindungi dan hanya bisa dieksekusi oleh `admin`.
    - **Upload Gambar**: Fungsi untuk mengunggah gambar produk ke Supabase Storage.
    - **Status**: UI untuk fitur ini belum diimplementasikan.

### C. Sistem Inti

1.  **Autentikasi**:
    - Menggunakan **Supabase Auth**.
    - Alur login, registrasi, dan logout dikelola oleh Supabase.

2.  **Otorisasi (RBAC)**:
    - Diterapkan pada level Server Action dan halaman.
    - Tabel `profiles` di Supabase memiliki kolom `role` (`admin` atau `user`).
    - Aksi atau halaman yang sensitif akan memverifikasi peran pengguna sebelum dieksekusi.

---

## 5. Kelemahan & Area untuk Peningkatan

1.  **Sumber Data Produk**:
    - **Masalah**: Halaman utama (`HomePage`) dan komponen terkait masih mengambil data dari file statis `src/lib/products.ts`. Ini adalah *mock data* dan tidak terhubung ke database.
    - **Rekomendasi**: Refactor `HomePage` untuk melakukan *fetch* data produk dari Supabase menggunakan Server Action `getProducts()` yang sudah ada.

2.  **Logika Chat yang Disimulasikan**:
    - **Masalah**: Komponen `ChatSheet` menggunakan `setTimeout` dan logika `if-else` sederhana untuk membalas pesan. Ini tidak interaktif dan tidak menyimpan riwayat chat.
    - **Rekomendasi**: Hubungkan `ChatSheet` ke backend sungguhan. Bisa menggunakan Supabase Realtime, atau integrasi dengan layanan AI seperti Gemini API untuk balasan yang lebih cerdas.

3.  **UI Manajemen Produk Admin**:
    - **Masalah**: Logika backend (Server Actions) untuk CRUD produk sudah ada, tetapi belum ada antarmuka (UI) di sisi klien untuk admin menggunakannya.
    - **Rekomendasi**: Buat halaman baru di `/admin/products` yang menggunakan `DataTable` untuk menampilkan daftar produk. Tambahkan fungsionalitas untuk membuat, mengedit, dan menghapus produk melalui form/dialog.

4.  **Pencarian & Filter**:
    - **Masalah**: Fungsionalitas pencarian dan filter saat ini berjalan di sisi klien terhadap data statis. Ini tidak efisien untuk dataset yang besar.
    - **Rekomendasi**: Pindahkan logika pencarian dan filter ke sisi server. Modifikasi Server Action `getProducts()` untuk menerima parameter pencarian dan filter, lalu terapkan pada query Supabase.

---

## 6. Langkah Selanjutnya (Next Steps)

Berikut adalah prioritas pengembangan yang disarankan:

1.  **(Prioritas Tinggi) Hubungkan Halaman Utama ke Database**:
    - Ganti `import { products } from "@/lib/products"` di `src/app/page.tsx` dengan pemanggilan Server Action `getProducts()`.
    - Gunakan `useEffect` atau React Server Components untuk memuat data produk dari database.

2.  **(Prioritas Tinggi) Implementasi UI Admin untuk Produk**:
    - Buat halaman `/admin/products/page.tsx`.
    - Gunakan `DataTable` untuk menampilkan produk yang diambil dari `getProducts()`.
    - Buat komponen `Dialog` atau halaman terpisah untuk form tambah/edit produk yang memanggil Server Action `saveProduct()`.

3.  **(Prioritas Sedang) Refactor Logika Chat**:
    - Rancang skema tabel `chats` dan `messages` di Supabase.
    - Ubah `ChatSheet` untuk membaca dan mengirim pesan ke database, idealnya menggunakan Supabase Realtime untuk pembaruan live.

4.  **(Prioritas Sedang) Pindahkan Logika Filter ke Server**:
    - Modifikasi `getProducts()` agar bisa menerima argumen seperti `searchTerm` dan `category`.
    - Terapkan filter ini pada query Supabase menggunakan `.ilike()` untuk pencarian dan `.eq()` untuk kategori.

5.  **(Jangka Panjang) Halaman Detail Produk**:
    - Buat halaman dinamis `app/product/[id]/page.tsx` untuk menampilkan detail satu produk.
    - Gunakan Server Action `getProductById()` untuk mengambil data.

---
