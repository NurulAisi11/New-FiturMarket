-- Mengaktifkan Row-Level Security (RLS) untuk tabel
-- 1. Buat fungsi helper untuk memeriksa peran admin.
-- Fungsi ini akan digunakan di banyak kebijakan RLS untuk menyederhanakan dan mengoptimalkan query.
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- 2. Mengaktifkan Row-Level Security (RLS) untuk tabel.
-- Perintah ini aman dijalankan berulang kali.
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 3. Hapus kebijakan yang mungkin sudah ada sebelumnya untuk memastikan skrip selalu menerapkan versi terbaru.
DROP POLICY IF EXISTS "Pengguna bisa melihat semua profil." ON public.profiles;
DROP POLICY IF EXISTS "Pengguna bisa memperbarui profilnya sendiri." ON public.profiles;
DROP POLICY IF EXISTS "Admin bisa mengelola semua profil." ON public.profiles;

DROP POLICY IF EXISTS "Produk bisa dilihat oleh siapa saja." ON public.products;
DROP POLICY IF EXISTS "Admin dapat mengelola produk." ON public.products;

-- 4. Buat kebijakan untuk tabel 'profiles'
CREATE POLICY "Pengguna bisa melihat semua profil." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Pengguna bisa memperbarui profilnya sendiri." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Menggunakan fungsi is_admin() untuk kebijakan admin.
CREATE POLICY "Admin bisa mengelola semua profil." ON public.profiles
  FOR ALL USING (is_admin());

-- 5. Buat kebijakan untuk tabel 'products'
CREATE POLICY "Produk bisa dilihat oleh siapa saja." ON public.products
  FOR SELECT USING (true);

-- Menggabungkan kebijakan INSERT, UPDATE, DELETE untuk admin menjadi satu kebijakan 'FOR ALL'
-- agar lebih ringkas dan mudah dikelola.
CREATE POLICY "Admin dapat mengelola produk." ON public.products
  FOR ALL -- Berlaku untuk SELECT, INSERT, UPDATE, DELETE
  USING (is_admin())
  WITH CHECK (is_admin());