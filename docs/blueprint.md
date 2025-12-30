# Dokumentasi Proyek: FiturMarket

**Versi:** 2.0.0
**Tanggal:** 25 November 2025

## 1. Pendahuluan

Dokumen ini berfungsi sebagai panduan teknis komprehensif untuk proyek **FiturMarket**, sebuah aplikasi e-commerce modern yang berfokus pada model bisnis **grosir (wholesale)**. Aplikasi ini menghubungkan produsen atau penjual tangan pertama langsung dengan pelanggan, dengan tujuan mendukung produk lokal dan pertumbuhan ekonomi yang merata di Indonesia.

**Tujuan Aplikasi:**
- Menyediakan platform e-commerce grosir yang mudah digunakan, bahkan bagi pengguna awam.
- Menghubungkan produsen lokal langsung ke pelanggan untuk memotong rantai distribusi.
- Mendukung pertumbuhan ekonomi lokal dengan mempromosikan produk-produk Indonesia.
- Menyediakan panel admin yang aman untuk mengelola produk, pesanan, dan pengguna.
- Mengimplementasikan fitur-fitur canggih seperti "Quality Passport" untuk transparansi produk.

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
| **Formulir**       | React Hook Form                                                        | Digunakan untuk form yang kompleks seperti di dialog produk.            |

---

## 3. Arsitektur & Struktur Proyek

Proyek ini mengikuti struktur standar Next.js App Router.

```
/
├── src/
│   ├── app/
│   │   ├── (public)/       # Grup rute untuk halaman yang dapat diakses publik
│   │   │   ├── page.tsx    # Halaman utama (Homepage)
│   │   │   └── ...
│   │   ├── admin/          # Grup rute yang dilindungi untuk admin
│   │   │   ├── products/   # Manajemen produk
│   │   │   ├── users/      # Manajemen pengguna
│   │   │   └── orders/     # Manajemen pesanan
│   │   └── ...
│   ├── components/         # Komponen React yang dapat digunakan kembali
│   ├── context/            # Konteks React untuk state global
│   ├── lib/                # Logika bisnis, utilitas, dan skema
│   └── ...
└── ...
```

---

## 4. Fitur-Fitur Utama (Saat Ini)

### A. Fitur Publik (Untuk Pengguna Umum)

1.  **Model Harga Grosir**:
    - **Minimum Order Quantity (MOQ)**: Setiap produk memiliki jumlah pesanan minimum.
    - **Tiered Pricing**: Harga per unit menurun seiring dengan peningkatan jumlah pembelian.

2.  **Halaman Detail Produk (`/product/[id]`)**:
    - Menampilkan detail lengkap produk, termasuk MOQ dan tabel harga grosir.
    - **Quality Passport**: Menampilkan informasi terverifikasi tentang asal, material, dan proses manufaktur produk.
    - Tombol untuk menambah produk ke keranjang (mematuhi MOQ) dan memulai chat dengan toko.

3.  **Rekomendasi AI**:
    - Menampilkan produk yang direkomendasikan berdasarkan riwayat penjelajahan pengguna.

4.  **Alur Checkout Grosir**:
    - Keranjang belanja yang menghitung total berdasarkan harga grosir.
    - Formulir checkout dan ringkasan pesanan.
    - Alur pembayaran manual dengan unggah bukti pembayaran.

5.  **Manajemen Pesanan Pengguna (`/my-orders`)**:
    - Pengguna dapat melihat riwayat pesanan mereka dan detail setiap pesanan.
    - Pengguna dapat mengunggah bukti pembayaran untuk pesanan yang "pending payment".

### B. Fitur Admin (Akses Terbatas)

1.  **Manajemen Produk (`/admin/products`)**:
    - UI lengkap untuk CRUD produk.
    - Kemampuan untuk mengatur MOQ dan tingkatan harga grosir untuk setiap produk.
    - Kemampuan untuk menambahkan dan mengedit data "Quality Passport".

2.  **Manajemen Pesanan (`/admin/orders`)**:
    - Menampilkan daftar semua pesanan pelanggan.
    - Memungkinkan admin untuk melihat detail pesanan, termasuk bukti pembayaran, dan mengubah status pesanan.

3.  **Manajemen Pengguna (`/admin/users`)**:
    - Menampilkan daftar pengguna dan memungkinkan admin untuk mengubah peran pengguna.

### C. Sistem Inti

1.  **Autentikasi & Otorisasi (RBAC)**:
    - Menggunakan Supabase Auth dengan peran `admin` dan `user`.
    - Keamanan diterapkan di level Server Action dan middleware.

---

## 5. Kelemahan & Area untuk Peningkatan

1.  **Integrasi Payment Gateway**:
    - **Masalah**: Alur checkout saat ini hanya mendukung pembayaran manual.
    - **Rekomendasi**: Integrasikan dengan payment gateway untuk otomatisasi proses pembayaran.

2.  **Verifikasi Pembelian untuk Ulasan**:
    - **Masalah**: Belum ada mekanisme untuk memverifikasi apakah pengguna yang memberikan ulasan telah membeli produk tersebut.
    - **Rekomendasi**: Tambahkan validasi untuk memastikan hanya pembeli yang dapat memberikan ulasan.

3.  **Manajemen Inventaris**:
    - **Masalah**: Sistem "stock hold" saat ini sederhana. Untuk model grosir, diperlukan manajemen inventaris yang lebih canggih.
    - **Rekomendasi**: Kembangkan sistem manajemen inventaris yang dapat menangani pesanan besar dan back-ordering.

---

## 6. Langkah Selanjutnya (Next Steps)

1.  **(Prioritas Tinggi) Penyempurnaan UX untuk Grosir**:
    - Lakukan review dan perbaikan pada alur pengguna untuk memastikan kemudahan penggunaan bagi target audiens (produsen dan pembeli grosir).
    - Perjelas informasi tentang MOQ dan harga grosir di seluruh aplikasi.

2.  **(Prioritas Sedang) Integrasi Payment Gateway**:
    - Implementasikan alur pembayaran otomatis untuk meningkatkan efisiensi transaksi.

3.  **(Jangka Panjang) Platform Multi-Vendor**:
    - Kembangkan fungsionalitas agar produsen dapat mendaftar dan mengelola produk mereka sendiri. Ini akan memerlukan peran `seller` atau `producer` baru.

---
