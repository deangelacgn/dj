export const createSecretCodeTable = `
  CREATE TABLE IF NOT EXISTS secret_codes (
    code INTEGER UNIQUE NOT NULL,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users (id),
    expiration TIMESTAMP(3) NOT NULL
  )
`;

export const dropSecretCodeTable = `DROP TABLE secret_codes`;