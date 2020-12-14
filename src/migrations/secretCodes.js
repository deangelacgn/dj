export const createSecretCodeTable = `
  CREATE TABLE IF NOT EXISTS secret_codes (
    id SERIAL PRIMARY KEY,
    code INTEGER UNIQUE NOT NULL,
  )
`;

export const dropSecretCodeTable = `DROP TABLE secret_codes`;