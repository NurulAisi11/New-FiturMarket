🛡️ Fitur Market — Panduan Keamanan & Validasi Sistem

Dokumen ini menjabarkan standar keamanan teknis, validasi data, dan kebijakan akses untuk Fitur Market — proyek marketplace modern di bawah Genexist Indonesia.
(Disesuaikan untuk arsitektur Next.js 14 (App Router) dengan Supabase Auth dan database Supabase (Postgres)).

Terakhir Diperbarui: 2025-10-24
Penanggung Jawab Keamanan: Tech Lead — Genexist Indonesia

1️⃣ Prinsip Umum Keamanan

Semua modul dan fitur Fitur Market dikembangkan berdasarkan prinsip:

Security by Design — keamanan dipertimbangkan sejak perancangan.

Least Privilege — hak akses serendah mungkin untuk tiap peran.

Defense in Depth — lapisan proteksi (validation, auth, network, monitoring).

Fail-safe defaults & Auditability — kegagalan aman dan jejak audit lengkap.

Tujuan: melindungi data pengguna, menjaga integritas transaksi, mencegah penyalahgunaan API, serta memastikan kemampuan audit dan recovery.

2️⃣ Validasi Dua Lapis (Client & Server)

Semua input harus tervalidasi di client dan server:

Client-side: UX-friendly validation (React Hook Form + Zod schema) — berikan pesan kesalahan jelas.

Server-side: Wajib melakukan parsing & pemeriksaan ulang menggunakan Zod (atau middleware validation) sebelum menyentuh database/Storage/Service.

Contoh pola:

Gunakan productSchema (Zod) yang sama untuk client & server agar konsistensi.

Jangan pernah mengandalkan hanya validasi client; server harus menolak payload yang tidak valid.

3️⃣ Sanitasi & Proteksi Input

Escape semua output teks sebelum dirender. Jangan gunakan dangerouslySetInnerHTML tanpa sanitizer.

Untuk rich text gunakan sanitizer (DOMPurify / sanitize-html) dan strip script / event attributes.

Hapus metadata sensitif (EXIF) dari upload gambar; gunakan sharp untuk transformasi dan hapus EXIF.

Batasi panjang input (max length) untuk field teks (contoh: deskripsi produk ≤ 2000 char).

4️⃣ XSS, CSRF, SSRF — Pencegahan Praktis

XSS: Escape output, Content Security Policy (CSP), dan sanitizer.

CSRF: Gunakan cookie SameSite=Strict + anti-CSRF token untuk form Server Actions bila diperlukan.

SSRF: Whitelist domain untuk outbound requests; validasi URL sebelum melakukan fetch dari server.

5️⃣ Upload File & Storage Security

Storage: Gunakan Supabase Storage dengan bucket private untuk file sensitif. Berikan akses melalui signed URLs (time-limited).

Validasi file: cek MIME type + extension + ukuran (default max 5 MB, kecuali aset resmi).

Naming: Rename file ke hash (SHA256) untuk mencegah collision/information leakage.

EXIF & PII: Strip EXIF dan metadata lokasi dari foto sebelum menyimpan.

Akses berbasis peran: pastikan operasi upload dan penghapusan dilindungi oleh server action yang memeriksa user.role.

Direktori rekomendasi: /storage/fiturmarket/uploads/private/

6️⃣ Autentikasi & Role Guard (RBAC)

Auth system: Supabase Auth (session cookie / JWT).

Roles: guest, user, seller, staff, admin.

Server Actions: setiap action sensitif harus memeriksa role sebelum eksekusi (contoh: if (user.role !== 'admin') throw unauthorized).

Frontend: sembunyikan UI admin, tetapi jangan menggantungkan keamanan pada UI — validasi server wajib.

Contoh pemeriksaan role (pattern):

const user = await getUserFromRequest(req);
if (!user) throw new Error("Unauthorized");
if (!["admin","staff"].includes(user.role)) {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

7️⃣ Rate Limiting & Anti-Abuse

Terapkan rate limit per IP / per user untuk endpoint publik (mis. 100 req / 10 menit) — implementasi di edge or reverse-proxy (Vercel Edge, Cloudflare) atau Redis-based counter.

Form publik (contact, login) gunakan invisible reCAPTCHA / honeypot.

Logging untuk “too many requests” diarahkan ke /docs/v1/dokumentasi/errorlog/.

8️⃣ Audit Log & Activity Tracking

Catat event penting ke tabel terpisah:

audit_log: login/logout, role change, critical admin action → (timestamp, user_id, ip, action, meta).

activity_log: CRUD produk, upload image, order status change → (user_id, action, target_id, payload_hash).

Pastikan logs immutable dan dirotasi/backup sesuai kebijakan.

Gunakan UUID v7 untuk id event agar mudah trace.

9️⃣ Database Security & Row-Level Security (RLS)

Karena memakai Supabase/Postgres:

Aktifkan RLS untuk tabel sensitif (profiles, orders, products jika per-seller visibility).

Buat policy berbasis auth.uid() untuk akses baris. Contoh:

create policy "profiles_self_select" on public.profiles
for select using (auth.uid() = id);


Hindari query string interpolation — gunakan parameter binding / prepared statements.

Gunakan migrations terkontrol dan DID untuk perubahan skema.

🔟 Monitoring, Alerting & Observability

Error tracking: Sentry (frontend & server).

User analytics / session replay: PostHog / LogRocket (opsional, patuhi privacy).

Health checks: UptimeRobot / Cronitor untuk critical jobs (cron, background workers).

Alerting: kirim notifikasi ke Slack/Teams bila ada spike error, DB errors, atau pelanggaran keamanan.

1️⃣1️⃣ Testing & Security Automation

Jadwalkan:

Unit Tests: Vitest / Jest — pada setiap push.

Integration Tests: menggunakan Postman / Newman untuk API; minimal weekly runs.

Vulnerability Scans / Pentest: OWASP ZAP / Burp Suite per kuartal.

Backup & Restore Drill: supabase dump + restore test bulanan.

Simpan laporan di /docs/v1/dokumentasi/security_test/.

1️⃣2️⃣ Backup, Secrets & CI/CD

Secrets: simpan di Secret Manager (Vercel Secrets / GitHub Secrets) — jangan commit ke repo.

Backups: snapshot DB harian; retensi sesuai kebijakan (30–90 hari).

CI/CD: pipeline harus memeriksa lint, tests, dan security checks sebelum deploy ke staging/production.

Rollbacks: setiap deployment wajib bisa rollback otomatis; dokumentasikan prosedur.

1️⃣3️⃣ Future Roadmap Keamanan (Rekomendasi)

Implementasi WebAuthn / Passkeys untuk login lebih aman.

Integrasi SIEM / BigQuery untuk analitik log jangka panjang.

Enkripsi tambahan pada client-side (AES-256) untuk data sensitif di kasus tertentu.

IAM / centralized role management untuk multi-tenant expansions.

Security score di admin dashboard (otomatis menilai konfigurasi keamanan penting).

1️⃣4️⃣ Incident Response & Playbook

Ketika insiden terjadi:

Isolate — hentikan proses atau service yang terdampak (rate limit, disable endpoint).

Triage — identifikasi scope, affected users, dan data exposure.

Notify — informasikan tim (Slack #security), stakeholders, dan bila perlu regulator.

Remediate & Restore — lakukan patch, rollback, restore dari backup bila perlu.

Post-mortem — susun laporan insiden & tindakan pencegahan; simpan di /docs/v1/dokumentasi/incident/.

1️⃣5️⃣ Governance & Tanggung Jawab

Security Lead: Tech Lead — Genexist Indonesia (owner final kebijakan).

Dev Team: menerapkan kebijakan di kode & pipeline.

QA / QA Security: menjalankan test & validasi rutin.

Product / PM: menilai risiko fitur baru & menyetujui DoD keamanan.

📌 Catatan Akhir

Keamanan adalah tanggung jawab bersama. Setiap PR fitur baru harus menyertakan checklist keamanan (validation, auth checks, RLS, rate limit) sebelum di-merge.

Build fast, but secure. — Genexist Indonesia Security Playbook