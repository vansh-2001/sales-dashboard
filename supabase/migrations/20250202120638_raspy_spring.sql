/*
  # Create tables for dashboard data

  1. New Tables
    - `comparison_data`
      - `id` (uuid, primary key)
      - `month` (text)
      - `last_year` (integer)
      - `this_year` (integer)
    - `customers_device`
      - `id` (uuid, primary key)
      - `date` (date)
      - `web_sales` (integer)
      - `offline_selling` (integer)
    - `top_products`
      - `id` (uuid, primary key)
      - `product_name` (text)
      - `sold_amount` (integer)
      - `unit_price` (decimal)
      - `revenue` (decimal)
      - `rating` (decimal)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Comparison Data Table
CREATE TABLE IF NOT EXISTS comparison_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  month text NOT NULL,
  last_year integer NOT NULL,
  this_year integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE comparison_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read comparison data"
  ON comparison_data
  FOR SELECT
  TO authenticated
  USING (true);

-- Customers Device Table
CREATE TABLE IF NOT EXISTS customers_device (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  web_sales integer NOT NULL,
  offline_selling integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE customers_device ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read customers device data"
  ON customers_device
  FOR SELECT
  TO authenticated
  USING (true);

-- Top Products Table
CREATE TABLE IF NOT EXISTS top_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name text NOT NULL,
  sold_amount integer NOT NULL,
  unit_price decimal NOT NULL,
  revenue decimal NOT NULL,
  rating decimal NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE top_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read top products"
  ON top_products
  FOR SELECT
  TO authenticated
  USING (true);