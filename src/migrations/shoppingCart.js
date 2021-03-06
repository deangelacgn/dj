export const createShoppingCartTable = `
  CREATE TABLE IF NOT EXISTS shopping_cart (
    product_id INTEGER UNIQUE NOT NULL REFERENCES products (id),
    quantity INTEGER NOT NULL
  )
`;

export const dropShoppingCartTable = `DROP TABLE shopping_cart`;