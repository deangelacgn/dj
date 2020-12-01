export const createPurchaseHistoryTable = `
  DROP TABLE IF EXISTS purchases;
  CREATE TABLE IF NOT EXISTS purchases(
    purchase_id SERIAL PRIMARY KEY,
    costumer_name VARCHAR NOT NULL,
    vendor_name VARCHAR NOT NULL,
    timestamp TIMESTAMP(3) NOT NULL
  )
`;

export const dropPurchaseHistoryTable = `DROP TABLE purchases`;