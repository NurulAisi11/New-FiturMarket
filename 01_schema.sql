-- 1. Buat tipe data custom untuk peran pengguna (Role)
DO $_$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE public.user_role AS ENUM ('admin', 'user');
  END IF;
END$_$;

-- 2. Buat tabel 'profiles' untuk menyimpan data tambahan pengguna
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'user'
);

-- Memberi komentar pada tabel dan kolom untuk kejelasan (dijalankan setelah tabel dibuat)
COMMENT ON TABLE public.profiles IS 'Profil pengguna untuk data tambahan yang tidak ada di auth.users.';
COMMENT ON COLUMN public.profiles.id IS 'Referensi ke auth.users.id.';
COMMENT ON COLUMN public.profiles.role IS 'Peran pengguna dalam sistem (admin atau user).';

-- 3. Buat tabel 'products' untuk data produk
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  image_url TEXT
);

-- Memberi komentar pada tabel produk
COMMENT ON TABLE public.products IS 'Tabel untuk menyimpan semua data produk di marketplace.';

-- Memastikan kolom 'stock' ada di tabel 'products' untuk mengatasi error.
-- Ini akan menambahkan kolom hanya jika belum ada.
DO $_$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_attribute WHERE attrelid = 'public.products'::regclass AND attname = 'stock') THEN
    ALTER TABLE public.products ADD COLUMN stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0);
  END IF;
END$_$;

-- 4. Buat fungsi untuk secara otomatis membuat profil saat ada pengguna baru mendaftar
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $_$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'user');
  RETURN new;
END;
$_$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Buat trigger yang akan menjalankan fungsi di atas setelah pengguna baru dibuat di auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();