
-- 09_wholesale.sql

-- Add columns for wholesale pricing to the products table
ALTER TABLE products
ADD COLUMN moq INT NOT NULL DEFAULT 1,
ADD COLUMN wholesale_pricing JSONB;
