export const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL
  )
`;

export const dropUsersTable = `
  DROP TABLE users;
`;