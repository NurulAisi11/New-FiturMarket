-- Membuat bucket 'product-images' jika belum ada
-- 1. Membuat bucket 'product-images' jika belum ada.
-- ON CONFLICT (id) DO NOTHING membuat perintah ini aman dijalankan berulang kali.
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Hapus kebijakan yang mungkin sudah ada sebelumnya untuk memastikan versi terbaru yang diterapkan.
DROP POLICY IF EXISTS "Izinkan akses publik untuk melihat gambar." ON storage.objects;
DROP POLICY IF EXISTS "Izinkan admin untuk mengunggah gambar." ON storage.objects;
DROP POLICY IF EXISTS "Izinkan admin untuk mengubah gambar." ON storage.objects;
DROP POLICY IF EXISTS "Izinkan admin untuk menghapus gambar." ON storage.objects;

-- 3. Buat kebijakan untuk bucket 'product-images'
CREATE POLICY "Izinkan akses publik untuk melihat gambar." ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- Menggunakan fungsi is_admin() yang telah dibuat di skrip 02_rls.sql
CREATE POLICY "Izinkan admin untuk mengunggah gambar." ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images' AND is_admin());

CREATE POLICY "Izinkan admin untuk mengubah gambar." ON storage.objects
  FOR UPDATE USING (bucket_id = 'product-images' AND is_admin());

CREATE POLICY "Izinkan admin untuk menghapus gambar." ON storage.objects
  FOR DELETE USING (bucket_id = 'product-images' AND is_admin());