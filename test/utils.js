import { createTables, dropTables, populateTables } from "../src/migrations/queryFunctions";
import { agent, BASE_URL } from './setup';

export const clearDatabase = () => {
  before(async function () {
    this.timeout(10000);
    await createTables();
  });

  after(async function() {
    this.timeout(10000);
    await dropTables();
  });
};

export const populateDatabase = () => {
  before(async function() {
    this.timeout(10000);
    await populateTables();
  });
};

export const createUser = (setAuthToken) => {
  before(async function() {
    const registerData = {
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'janedoe@somemail.com',
      password: '12345',
    };

    await agent.post(`${BASE_URL}/user`).expect(200).send(registerData);

    const loginData = {
      user_login: 'janedoe',
      password: '12345',
    };
    const authResponse = await agent.post(`${BASE_URL}/login`).expect(200).send(loginData);
    setAuthToken(authResponse.body.token);
  });
};