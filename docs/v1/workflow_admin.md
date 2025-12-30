

# 🛠️ Fitur Market — Workflow Admin Panel

---

> Dokumen ini berfungsi sebagai panduan umum untuk sistem administrasi internal **Fitur Market** di bawah **Genexist Indonesia**.
> Berisi struktur akses, fitur, alur kerja, dan panduan keamanan untuk tim admin serta pengelola platform (berdasarkan arsitektur Next.js 14 App Router + Supabase Auth/DB yang dijabarkan di blueprint).

---

## 1️⃣ Scope & Tujuan

Admin Panel dirancang untuk:

* Mengelola data inti platform (pengguna, produk, aset media, dan konfigurasi).
* Menjaga kualitas & keamanan aktivitas di marketplace.
* Menyediakan insight operasional melalui dashboard & log aktivitas real-time.
* Memberikan kontrol penuh terhadap status publikasi dan moderation konten/produk.

🎯 **Tujuan utama:** mempermudah manajemen operasional tanpa mengorbankan keamanan, konsistensi data, dan auditability.

---

## 2️⃣ Struktur Navigasi Utama

| Modul                  | Fungsi                                                                                | Role Akses        |
| ---------------------- | ------------------------------------------------------------------------------------- | ----------------- |
| **Dashboard**          | KPI inti (pengguna aktif, total produk, aktivitas terbaru), log ringkas               | Admin, Superadmin |
| **User Management**    | Daftar pengguna, perubahan peran (RBAC), reset akses                                  | Admin, Superadmin |
| **Product Management** | CRUD produk (Server Actions), upload gambar (Supabase Storage), kategori, stok, harga | Admin             |
| **Reports / Logs**     | Audit trail aksi sensitif, ekspor CSV                                                 | Superadmin        |
| **Settings**           | Konfigurasi environment, feature flags, template notifikasi                           | Superadmin        |

🧭 Hierarki navigasi: `Dashboard → Module → List/Detail → Action`.

> Catatan: modul **Orders/Payments** disiapkan untuk fase berikutnya (mengikuti roadmap produk).

---

## 3️⃣ Login & Access Control

### a) Mekanisme Login

* **Auth:** Supabase Auth (session via HttpOnly cookie / JWT).
* **Timeout:** sesi idle otomatis 30 menit.
* **2FA:** opsional untuk **Superadmin**.

### b) Role-based Access (RBAC)

| Role (Aplikasi)             | Hak Akses Admin Panel                                           | Keterangan                                            |
| --------------------------- | --------------------------------------------------------------- | ----------------------------------------------------- |
| **admin**                   | Akses penuh modul operasional (Users, Products, Logs read-only) | Role database yang ada pada `profiles.role`           |
| **user**                    | Tidak memiliki akses Admin Panel                                | Role default pengguna marketplace                     |
| **superadmin** *(internal)* | Seluruh akses termasuk Settings & log sensitif                  | Role operasional (logical), dipetakan via policy/flag |

🔒 Validasi role dilakukan pada **Server Actions** dan middleware route admin (jangan hanya mengandalkan UI).

---

## 4️⃣ Fitur & Modul Detail

### 🧭 Dashboard

* Ringkasan KPI: total produk aktif, pengguna aktif, aktivitas terakhir (create/update/delete).
* Grafik periode (harian/mingguan/bulanan) untuk produk & pengguna.
* *Quick actions:* tambah produk, kelola pengguna.

### 👤 User Management

* Tabel pengguna (search, filter by role/status).
* **Ubah peran:** `user ↔ admin` (via Server Action yang memverifikasi peran eksekutor).
* Nonaktifkan/aktifkan akun (soft disable).
* Lihat *activity snippet* user (aksi terakhir).

### 📦 Product Management

* **CRUD** produk via Server Actions yang sudah tersedia (`getProducts`, `getProductById`, `saveProduct`, `deleteProduct`).
* Upload gambar ke **Supabase Storage** (rename → hash, validasi mime/ukuran).
* Atur kategori, stok, harga, dan status publikasi (`draft/published/archived`).
* (Opsional) **Quality Passport / Variants / Reviews**: kolom JSON terstruktur.

### 📑 Reports / Logs

* **Audit log:** perubahan peran, penghapusan produk, & tindakan sensitif.
* Ekspor CSV untuk inspeksi/rekap bulanan.
* Filter berdasarkan waktu, user, dan jenis aksi.

### ⚙️ Settings

* Variabel lingkungan (baca-saja), feature flags (toggle modul), pengaturan notifikasi.
* Tautan cepat ke dokumentasi keamanan & SOP release.

---

## 5️⃣ Workflow Operasional Harian

| Aktivitas                             | Role       | Frekuensi | Panel/Tools           |
| ------------------------------------- | ---------- | --------- | --------------------- |
| Verifikasi & perubahan peran pengguna | Admin      | Harian    | User Management       |
| Kurasi & pembaruan produk             | Admin      | Harian    | Product Management    |
| Review audit log & anomali            | Superadmin | Mingguan  | Reports / Logs        |
| Backup & pemeriksaan health           | Superadmin | Mingguan  | Supabase / Monitoring |
| Review konfigurasi & feature flags    | Superadmin | Bulanan   | Settings              |

📌 Semua catatan disimpan di `/docs/v1/dokumentasi/progress/`.

---

## 6️⃣ Alur Kerja Inti (Flow)

**Produk baru:**
`Draft → Lengkapi data & gambar → Validasi (server) → Publish → Tersedia di marketplace`

**Perubahan peran pengguna:**
`Admin ajukan perubahan → Server Action verifikasi eksekutor (admin/superadmin) → Update profiles.role → Catat ke audit log`

**Penghapusan produk:**
`Admin pilih produk → Delete (soft/hard sesuai kebijakan) → Catat audit log → Sinkronkan cache list`

---

## 7️⃣ Proteksi & Keamanan

| Area        | Proteksi                                    | Implementasi                          |
| ----------- | ------------------------------------------- | ------------------------------------- |
| Auth & RBAC | Supabase Auth + pengecekan `profiles.role`  | Guard di Server Actions & route admin |
| Validasi    | Skema **Zod** (client & server)             | Shared schema (`lib/schemas.ts`)      |
| Upload      | Validasi mime/size, rename hash, signed URL | Supabase Storage                      |
| Rate Limit  | 100 req / 10 menit / IP                     | Middleware `ratelimit` (edge/Redis)   |
| Audit       | Log aksi sensitif & rotasi                  | Tabel `audit_log`                     |
| Backup      | Snapshot DB mingguan                        | Supabase backup + verifikasi          |
| Error       | Observability                               | Sentry / LogRocket (privacy-aware)    |

Rujukan detail: `docs/v1/security.md`.

---

## 8️⃣ Best Practices Operasional

* Gunakan status **Draft** sebelum **Publish**.
* Terapkan **review 2-mata** (minimal 1 re-viewer) untuk perubahan besar.
* Semua perubahan peran/produk **wajib** tercatat di audit log.
* Hindari perubahan langsung pada DB tanpa Server Actions.
* Simpan revisi dokumen di `/docs/v1/dokumentasi/revision/`.
* Gunakan *semantic commit* & tag versi admin panel (`v1.0-admin`, `v1.1-products-ui`, …).

---

## 9️⃣ Catatan Teknis

* **Frontend:** Next.js 14 (App Router, RSC)
* **Backend:** Next.js Server Actions (terintegrasi Supabase)
* **Database:** Supabase (Postgres)
* **Auth:** Supabase Auth
* **Storage:** Supabase Storage
* **Monitoring:** Sentry / LogRocket
* **Deployment:** Vercel

> Semua environment variable dikelola via platform deploy & `env` dashboard Superadmin.

---

## 🔟 Next Steps (Sejalan dengan Blueprint)

| Rencana                                          | Tujuan                                     | Prioritas       |
| ------------------------------------------------ | ------------------------------------------ | --------------- |
| **UI Admin Products** (list, create/edit dialog) | Memanfaatkan Server Actions yang sudah ada | Tinggi          |
| **Filter & Pencarian di Server**                 | Efisien untuk data besar (Supabase query)  | Tinggi          |
| **Detail Produk Dinamis** (`/product/[id]`)      | Alur moderasi & edit cepat                 | Sedang          |
| **Chat Moderation & Logs**                       | Persistensi & analitik percakapan          | Sedang          |
| **Orders/Payments Module**                       | Siapkan struktur & audit trail             | Jangka menengah |

---

## Kesimpulan

Admin Panel **Fitur Market** adalah pusat kendali operasional marketplace.
Keamanan, efisiensi, dan konsistensi workflow menjadi prioritas utama.
Setiap perubahan harus tervalidasi lintas peran dan terdokumentasi dengan baik.

**PIC Utama:** Tech Lead — Genexist Indonesia
**Diperbarui Terakhir:** 24 Okt 2025

> “Control without clarity is chaos — Admin panel brings both.”
> *— Genexist Indonesia Internal Workflow Guide* ⚙️

---
