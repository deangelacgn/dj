export const createUsersTable = `
  DROP TABLE IF  EXISTS users;
  CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL
  )
`;

export const dropUsersTable = `
  DROP TABLE users;
`;