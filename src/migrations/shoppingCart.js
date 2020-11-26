export const createShoppingCarTable = `
  DROP TABLE IF EXISTS shopping_car;
  CREATE TABLE IF NOT EXISTS shopping_car (
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL
  )
`;

export const dropShoppingCarTable = `DROP TABLE shopping_car`;