
-- 06_orders.sql

-- Create the orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  guest_id TEXT,
  total NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_payment',
  shipping_address JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  proof_of_payment_url TEXT
);
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Enable insert for authenticated users" ON orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Enable insert for anonymous users" ON orders FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Enable update for own orders" ON orders FOR UPDATE USING (auth.uid() = user_id);


-- Create the order_items table
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INT NOT NULL,
  price NUMERIC NOT NULL
);
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for own order items" ON order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
  )
);
CREATE POLICY "Enable insert for all users" ON order_items FOR INSERT WITH CHECK (true);

-- Create a 'holds' table to manage stock holds
CREATE TABLE holds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);
ALTER TABLE holds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON holds FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON holds FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable delete for all users" ON holds FOR DELETE USING (true);
