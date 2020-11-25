import {
  dropTables,
  createTables,
} from '../src/migrations/queryFunctions';

beforeEach(async () => {
  await createTables();
});

afterEach(async () => {
  await dropTables();
});