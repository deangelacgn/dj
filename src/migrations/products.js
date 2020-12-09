export const createProductsTable = `
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    available_quantity INTEGER NOT NULL,
    cost_per_unit DECIMAL(6, 2) NOT NULL
  )
`;

export const populateProductsTable = `
  INSERT INTO products(id, name, available_quantity, cost_per_unit)
  VALUES (1, 'Mobile phone', 15, 750.60),
        (2, 'Mirror', 5, 25.50),
        (3, 'Doll', 10, 10.40),
        (4, 'Glasses', 6, 240),
        (5, 'Chess set', 4, 25.90),
        (6, 'Pillow', 30, 39.90);
  SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
`;

export const dropProductsTable = `DROP TABLE products`;