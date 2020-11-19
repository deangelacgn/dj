import {
  dropTables,
  createTables,
  insertIntoTables,
} from '../src/utils/queryFunctions';

beforeEach(async () => {
  await createTables();
  await insertIntoTables();
});

afterEach(async () => {
  await dropTables();
});