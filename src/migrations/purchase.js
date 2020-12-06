export const createPurchaseHistoryTable = `
  DROP TABLE IF EXISTS purchases;
  CREATE TABLE IF NOT EXISTS purchases(
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR NOT NULL,
    vendor_name VARCHAR NOT NULL,
    timestamp TIMESTAMP(3) NOT NULL
  )
`;

export const dropPurchaseHistoryTable = `DROP TABLE purchases`;