export const createProductsTable = `
  DROP TABLE IF EXISTS products;
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    available_quantity INTEGER NOT NULL,
    cost_per_unit DECIMAL(6, 2) NOT NULL
  )
`;

export const dropProductsTable = `DROP TABLE products`;