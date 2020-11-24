export const createInventoryTable = `
  DROP TABLE IF EXISTS inventory;
  CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    available_quantity INT NOT NULL,
    cost_per_unit INT NOT NULL
  )
`;

export const dropInventoryTable = `DROP TABLE inventory`;