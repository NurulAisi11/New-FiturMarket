Fitur Market — Thema & Visual System

Panduan identitas visual, komponen UI, dan perilaku responsif untuk seluruh aset digital Fitur Market di bawah Genexist Indonesia.
Tujuan: konsistensi brand, kemudahan implementasi, dan aksesibilitas.
Stack acuan: Next.js 14 App Router, Tailwind CSS, shadcn/ui, Supabase (Auth, Postgres, Storage).

1) Identitas & Karakter

Konsep inti: AI-driven marketplace yang clean, tepercaya, dan efisien

Moodboard kata kunci: modern, friendly, efficient

Gaya: clean, airy, minimal-motion (kinetic seperlunya)

Tone komunikasi: friendly–modern (startup tech)

2) Skema Warna (Light & Dark)
Mode	Primary	Secondary	Accent	Background	Surface	Success	Warning	Danger
Light	#29ABE2	#0B72B9	#008080	#F0F8FF	#FFFFFF	#22C55E	#F59E0B	#EF4444
Dark	#7FD3F2	#93C5FD	#5EEAD4	#0B132B	#111827	#34D399	#FBBF24	#F87171

Gradasi utama: linear-gradient(90deg, #29ABE2 0%, #008080 100%)

State warna:

Hover: +4% brightness

Active: −6% brightness

Disabled: opacity 0.4

3) Tipografi
Elemen	Font	Berat	Desktop	Mobile	Catatan
Heading H1	Inter	600–700	48–64px	clamp(28px, 6vw, 36px)	Tight leading
Heading H2	Inter	600	32–40px	22–26px	—
Body	Inter	400–500	16–18px	15–16px	line-height 1.6
Caption/Meta	Inter	400	12–14px	12–14px	letter-spacing +0.2px

Font loading: font-display: swap

Bahasa: dukung Latin & Indonesian ligatures

4) Layout & Grid Responsif

Desktop

Max width: 1440px (content: 1200px)

Grid: 12 kolom, gutter 24px

Section padding: px-12 (desktop), px-6 (tablet)

Mobile

Grid: 1 kolom penuh

Safe area padding: px-4

Komponen carousel → 1 item/slide (swipe)

5) Spacing, Radius, Elevation

Spacing scale (rem): 2 4 6 8 12 16 24 32 48 64

Radius: sm 8px · md 12px · lg 16px · xl 24px · 2xl 32px (card)

Shadow/Elevation:

low: 0 1px 2px rgba(0,0,0,.06)

mid: 0 6px 20px rgba(0,0,0,.10)

high: 0 12px 40px rgba(0,0,0,.14)

6) Komponen (Tailwind + shadcn/ui)

Semua komponen dibangun di atas shadcn/ui + Radix UI untuk aksesibilitas dan konsistensi.

Button

Variants: primary | secondary | ghost | link

Shape: rounded-2xl, padding px-5 py-3

Hover: subtle glow; Active: pressed −2px; Focus: ring 2px accent

Card

Radius rounded-card, padding p-6 lg:p-8, shadow mid, surface menggunakan token --color-surface

Input / Field

Border 1px neutral/20; Focus ring accent; Error ring danger

Validasi mengikuti skema Zod untuk konsistensi client–server.

Modal/Dialog

Backdrop blur backdrop-blur-xl, border subtle, close area 44–48px (tap target)

Navigation

Desktop: top bar sticky (shadow low)

Mobile: bottom nav opsional (maks 5 ikon)

Tambahkan: Tabs, Tooltip, Dropdown, Breadcrumb, Toast — gunakan token yang sama agar tema konsisten.

7) State, Interaksi, & Motion

Easing standar: cubic-bezier(0.16,1,0.3,1)

Durasi: 150–300ms (UI), 400–700ms (transisi scene)

Scroll motion: aktif untuk desktop; reduced 50% di mobile

Prefers-reduced-motion: nonaktifkan animasi berat otomatis

Micro-interaction: hover lift (1–2px), shadow shift kecil

8) Aksesibilitas (WCAG 2.1 AA)

Kontras teks ≥ 4.5:1

Fokus ring visible di semua kontrol

Tap area min. 44×44px

Alt text deskriptif pada media

Hindari “motion-only” cues; sediakan fallback

9) Token Design (CSS Variables)
:root {
  --color-primary: #29ABE2;
  --color-secondary: #0B72B9;
  --color-accent: #008080;
  --color-bg: #F0F8FF;
  --color-surface: #FFFFFF;
  --radius-card: 1.25rem;
  --easing: cubic-bezier(0.16,1,0.3,1);
  --shadow-mid: 0 6px 20px rgba(0,0,0,.10);
}

[data-theme="dark"]{
  --color-primary: #7FD3F2;
  --color-secondary: #93C5FD;
  --color-accent: #5EEAD4;
  --color-bg: #0B132B;
  --color-surface: #111827;
}

10) Tailwind Config (extend)
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
      },
      borderRadius: {
        card: 'var(--radius-card)',
      },
      boxShadow: {
        mid: 'var(--shadow-mid)',
      },
      transitionTimingFunction: {
        brand: 'var(--easing)',
      },
    }
  }
}

11) Ikon, Ilustrasi, & Gambar

Ikon: lucide-react — ukuran 18/20/24, stroke 1.5–2

Ilustrasi: flat clean (opsional 2.5D subtle)

Foto: tone bright-neutral, background bersih; gunakan WebP/AVIF (kompresi modern)

12) Aset Brand & Loading

Favicon: SVG monogram “FM” + fallback PNG 32/64

Loading screen: progress bar tipis di bawah navbar (SSR friendly)

Scroll indicator: progress line opsional di kanan viewport

13) Halaman Kunci & Pattern

Hero: full-bleed, headline 6–10 kata, CTA ganda (primary/secondary)

List/Grid: 3–4 kolom desktop, 1–2 kolom mobile

Detail Page: header visual + metadata + body readable

Form: label di atas, help text kecil, error jelas

Empty State: ilustrasi kecil + CTA (mis. “Mulai jelajah produk”)

14) Contoh Implementasi (Snippet)
// Button (shadcn) – variant primary
<Button className="rounded-2xl bg-primary text-white hover:brightness-105 focus:ring-2 focus:ring-accent transition-[transform,filter] duration-200 ease-brand">
  Mulai Belanja
</Button>

15) Pengujian Visual

Checklist sebelum rilis:

[ ] Kontras teks lolos AA
[ ] Responsive desktop → mobile
[ ] Motion aman untuk prefers-reduced-motion
[ ] Komponen utama konsisten (Button, Card, Input, Modal)
[ ] Dark mode tidak “pecah” tokennya

16) Catatan Implementasi

UI Kit: shadcn/ui (Radix)

Motion: Framer Motion (GSAP opsional)

Font import: @next/font/google atau self-hosted

Theme Provider: context untuk toggle light/dark

Acuan struktur proyek & komponen: lihat src/app, components/ui, chat-sheet.tsx, product-grid.tsx.

brand-style

17) Revisi & Versi

Versi saat ini: v1.0.0

Tanggal: 2025-10-24 (Asia/Jakarta)

Penanggung jawab: Design Lead — Genexist Indonesia / Frontend Lead — Genexist Indonesia

Semua perubahan tema dicatat di /docs/v1/dokumentasi/revision/.
Untuk konsistensi dengan arsitektur & fitur, rujuk blueprint proyek.