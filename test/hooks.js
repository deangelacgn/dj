import {
  dropTables,
  createTables,
} from '../src/migrations/queryFunctions';

before(async function() {
  this.timeout(10000);
  await createTables();
});

after(async function () {
  this.timeout(10000);
  await dropTables();
});