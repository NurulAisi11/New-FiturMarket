
-- 08_quality_passport.sql

-- Add the quality_passport column to the products table
ALTER TABLE products
ADD COLUMN quality_passport JSONB;
