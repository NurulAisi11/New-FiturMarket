-- 05_chat.sql

-- Create the products table if it doesn't exist
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  stock INT,
  category TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create the chats table
CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  guest_id TEXT,
  product_id UUID REFERENCES products(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON chats FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON chats FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Enable insert for anonymous users" ON chats FOR INSERT TO anon WITH CHECK (true);


-- Create the messages table
CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  chat_id UUID NOT NULL REFERENCES chats(id),
  content TEXT NOT NULL,
  sender TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON messages FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON messages FOR INSERT WITH CHECK (true);

-- Create a realtime publication for the messages table
CREATE PUBLICATION supabase_realtime FOR TABLE messages;
