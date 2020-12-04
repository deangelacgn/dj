export const createUsersTable = `
  DROP TABLE IF  EXISTS users;
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL
  )
`;

export const dropUsersTable = `
  DROP TABLE users;
`;