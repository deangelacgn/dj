export const createShoppingCartTable = `
  DROP TABLE IF EXISTS shopping_cart;
  CREATE TABLE IF NOT EXISTS shopping_cart (
    id INTEGER UNIQUE NOT NULL,
    quantity INTEGER NOT NULL
  )
`;

export const dropShoppingCartTable = `DROP TABLE shopping_cart`;