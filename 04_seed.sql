-- Hapus data lama untuk menghindari duplikat jika skrip dijalankan lagi
-- 1. Tambahkan constraint unik pada kolom 'name' jika belum ada.
-- Ini diperlukan agar kita bisa menggunakan ON CONFLICT(name) pada INSERT.
-- Menggunakan blok DO $$ BEGIN ... END $$; untuk memeriksa keberadaan constraint.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'products_name_key'
        AND conrelid = 'public.products'::regclass
    ) THEN
        ALTER TABLE public.products ADD CONSTRAINT products_name_key UNIQUE (name);
    END IF;
END$$;

-- 2. Masukkan data contoh untuk produk.
-- Menggunakan 'ON CONFLICT (name) DO NOTHING' membuat skrip ini idempotent.
-- Jika produk dengan nama yang sama sudah ada, perintah ini akan diabaikan dan tidak menyebabkan error.
-- Ini lebih aman daripada TRUNCATE yang akan menghapus semua data yang ada.
INSERT INTO public.products (name, description, price, stock, image_url) VALUES
('Laptop Pro X1', 'Laptop canggih dengan performa tinggi untuk para profesional.', 15000000, 50, NULL),
('Smartphone G-Series', 'Smartphone dengan kamera terbaik di kelasnya dan baterai tahan lama.', 7500000, 120, NULL),
('Headphone Noise-Cancelling', 'Nikmati musik tanpa gangguan dengan teknologi peredam bising aktif.', 2500000, 80, NULL),
('Smartwatch Fit+', 'Pantau kesehatan dan aktivitas harian Anda dengan gaya.', 1800000, 200, NULL),
('Mechanical Keyboard K7', 'Keyboard mekanikal dengan RGB yang bisa dikustomisasi untuk gaming dan mengetik.', 1200000, 75, NULL)
ON CONFLICT (name) DO NOTHING;

-- Catatan: image_url sengaja dikosongkan untuk diisi melalui aplikasi.