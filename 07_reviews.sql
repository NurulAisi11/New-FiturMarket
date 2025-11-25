
-- 07_reviews.sql

-- Create the reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON reviews FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON reviews FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Enable delete for own reviews" ON reviews FOR DELETE USING (auth.uid() = user_id);
