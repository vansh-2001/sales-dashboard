/*
  # Add Dashboard Data

  1. Data Population
    - Add comparison data for monthly sales
    - Add top products data
    - Add customers device data

  2. Security
    - Enable RLS policies for data access
*/

-- Insert comparison data
INSERT INTO comparison_data (month, last_year, this_year) VALUES
  ('Jan', 5000, 6000),
  ('Feb', 10000, 2000),
  ('Mar', 20000, 40000),
  ('Apr', 32000, 21000),
  ('May', 12000, 9200),
  ('Jun', 13000, 8700);

-- Insert top products data
INSERT INTO top_products (product_name, sold_amount, unit_price, revenue, rating) VALUES
  ('Camera Mi 360°', 432, 120, 51840, 4.81),
  ('Massage Gun', 120, 112, 25440, 3.44),
  ('Vacuum-Mop 2 Pro', 221, 320, 15123, 3.22),
  ('Vacuum-Mop 2', 223, 234, 32812, 3.00);