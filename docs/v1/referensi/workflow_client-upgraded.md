🧩 Fitur Market — Client Workflow (Upgraded)

Filename: workflow_client-upgraded.md
Version: v1.0.0
Date: 2025-10-24
Applies to: Next.js 14 (App Router) + Supabase (Postgres + Storage)
Owner: Tech Lead / PM — Genexist Indonesia
Status: In-Production

⚙️ 0. Executive Summary

Dokumen ini mendefinisikan alur pengguna guest-first untuk e-commerce Fitur Market: discover → add to cart → checkout (HOLD) → pay → track shipment → complete, berfokus pada:

Reliabilitas (secure by default, RLS)

UX cepat & jelas

Edge-friendly patterns (cache/tag)

Skalabilitas multi-brand & multi-seller (roadmap)

1️⃣ System Overview
Layer	Stack / Tools	Keterangan
Frontend	Next.js App Router + React 19	Hybrid SSR/RSC + ISR
Backend	Server Actions + Route Handlers	Authenticated, stateless API surface bila perlu
Database	Supabase / PostgreSQL	RLS aktif, enum role
Storage	Supabase Storage	Server-only upload, signed URL
Validation	Zod + React Hook Form	Paritas client–server
Rate Limiting	Upstash Redis (prod)	Per-IP / endpoint
Monitoring	Sentry + PostHog + Cronitor	Error, UX funnel, uptime
2️⃣ Core Shopping Flow
graph TD
A[Landing / Product Grid] --> B[Product Detail]
B --> C[Add to Cart]
C --> D[Cart]
D --> E[Checkout -> HOLD 15m]
E --> F[Payment (manual/gateway)]
F --> G[Order Status (PAID->PROCESSING->SHIPPED->COMPLETED)]
G --> H[Review / Reorder]

State	Trigger	Next
HOLD	Buat order draft + konfirmasi biaya	PENDING_PAYMENT
PENDING_PAYMENT	Bukti / webhook gateway valid	PAID
PAID	Fulfillment start	PROCESSING
PROCESSING	Resi dibuat	SHIPPED
SHIPPED	Diterima	COMPLETED
HOLD Expired	TTL 15 menit habis	EXPIRED

TTL HOLD 10–15 menit; semua harga/ongkir dan stok re-validated saat HOLD.

3️⃣ API Architecture

Route Handlers (public-ish reads):

GET /api/products — query + filter + sort (paginated, cacheable)

GET /api/products/:id — detail & snapshot stok

GET /api/shipping/quote — estimasi ongkir (mock/nyata)

Server Actions (mutations, guarded):

cart.createOrGet() — inisialisasi cart-token anonim (cookie HttpOnly)

cart.addItem(payload) — tambah/ubah qty; re-cek stok

checkout.createHold(orderDraft) — buat HOLD + lock harga/ongkir

payment.submitProof(formData) — unggah bukti (mode manual)

order.getStatus(code) — status real-time (poll/SSE)

Seluruh SA divalidasi Zod + idempotency-key; endpoints publik stateless dengan header cache terukur.

4️⃣ Server-Side File Upload

Implementasi di Route Handler/SA (app/api/upload/route.ts / actions.ts)

Validasi mime/size dari buffer → proses (Sharp) → hapus EXIF → simpan ke Storage

Update entitas (order/payment) setelah upload sukses; jika DB update gagal → rollbackUpload()

Storage Policy (Supabase RLS):

CREATE POLICY "admin_only_upload" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (auth.role() IN ('admin','superadmin'));

5️⃣ Rate Limiting
Endpoint	Limit	Window	Error
/api/checkout/hold	5 req	15m	429
/api/payment/proof	3 req	15m	429
/api/*	100 req	1m	429
await rateLimit(req, { maxRequests: 5, windowMs: 15*60_000 })


Dev: in-memory. Prod: Upstash/Redis di edge.

6️⃣ Validation Schema (Zod + RHF)

Client Form (Checkout)

const checkoutSchema = z.object({
  name: z.string().min(3).regex(/^[a-zA-Z\s.'-]+$/),
  phone: z.string().min(9),
  address: z.object({
    line1: z.string().min(10).max(120),
    city: z.string().min(3),
    postal: z.string().min(4).max(10)
  }),
  notes: z.string().max(120).optional()
})


Server Validation (HOLD)

const holdSchema = z.object({
  cartToken: z.string(),
  shippingMethod: z.enum(['REG','YES','SAME_DAY']),
  items: z.array(z.object({ id: z.string(), qty: z.number().min(1).max(999) }))
})


Schema dibagi bersama (/src/lib/schemas.ts) untuk konsistensi.

7️⃣ Client UX Enhancements

Countdown HOLD sinkron server (header X-Server-Time untuk offset)

Form autosave (debounce 500ms)

WhatsApp normalizer (08… → +628…)

Skeletons & optimistic UI untuk cart

Reduced-motion aware; kurangi intensitas animasi di mobile

8️⃣ Security & Data Protection
Area	Implementasi	Detail
Upload	Server-only	Strip EXIF, hash filename
Session	HttpOnly cookies	Rotasi saat login baru
Rate Limit	Per-IP & endpoint	429 + Retry-After
RLS	Database-level	Kepemilikan order by userId/cartToken
Audit	audit_logs	Catat aksi kritikal (hold, pay, cancel)
CSRF/Origin	Middleware	Validasi origin untuk POST

QR ticket opsional (promosi/event); untuk e-commerce fokus pada invoice & resi.

9️⃣ Database Functions (Core)

Capacity Snapshot

-- contoh view
SELECT capacity_left, hold_pool_left
FROM get_product_capacity_snapshot(:product_id);


Expire Holds

UPDATE orders SET state='EXPIRED'
WHERE state='HOLD' AND hold_expires_at <= now();


Jalankan via cron/scheduler tiap 1–2 menit.

🔟 Monitoring & Observability

Sentry: error tracing (frontend + server)

PostHog: funnel (add-to-cart → paid), heatmap, rage-click

UptimeRobot / Cronitor: health checks /healthz

Log retention: 14 hari minimum; sample rate 1.0 untuk mutasi checkout

11️⃣ Accessibility Checklist

ARIA label semua input ✅

Focus ring jelas + trap di modal ✅

Keyboard navigation penuh (Tab/Enter/Esc) ✅

High-contrast mode lolos AA ✅

prefers-reduced-motion dihormati ✅

12️⃣ Performance Optimization

Edge caching (listing: 5m; assets: 1y immutable)

noStore() untuk data dinamis (cart/status)

Image optimization untuk preview upload

Hydration target < 3s; Lighthouse ≥ 90 (all)

13️⃣ Migration Guidelines
Phase	Fokus	Deliverables
P0	Security foundation	RLS, rate limit, upload validation
P1	UX & server-time sync	Countdown HOLD, autosave
P2	Monitoring & A11y	Metrics, reduced-motion
P3	Optimization	Edge runtime, caching tiered
14️⃣ Testing Scope
Test Type	Fokus
Unit	Zod validation, phone normalizer
Integration	Proof upload, HOLD→PENDING_PAYMENT
E2E	Browse → cart → checkout → pay → track
Performance	100 concurrent HOLD & add-to-cart
15️⃣ Environment Variables
NEXT_PUBLIC_APP_ENV=production
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<secret>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<public>
QR_SECRET=<optional-hmac-for-events>
UPSTASH_REDIS_URL=<url>
UPSTASH_REDIS_TOKEN=<token>


Validasi semua variabel via envSchema.parse(process.env) saat startup.

16️⃣ Governance
Area	Owner	Review
Security (RLS, Upload, Rate-Limit)	Security Lead	Monthly
UX & Accessibility	Design Lead	Bi-Monthly
Database & Capacity	DevOps Lead	Weekly
Docs & Testing	QA/Docs Owner	Quarterly

🪶 Closing Statement

“A seamless checkout is a promise kept — cepat, aman, dan dapat diprediksi.”
— Genexist Indonesia, Product Engineering Team

📅 Last Updated: 2025-10-24
👨‍💻 Maintainer: Tech Lead — Fitur Market
🧠 Version: v1.0.0