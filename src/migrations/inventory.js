export const createInventoryTable = `
  DROP TABLE IF EXISTS inventory;
  CREATE TABLE IF NOT EXISTS inventory (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    available_quantity INTEGER NOT NULL,
    cost_per_unit DECIMAL(6, 2) NOT NULL
  )
`;

export const dropInventoryTable = `DROP TABLE inventory`;