import { pool } from '../models/pool';
import { dropProductsTable, createProductsTable, populateProductsTable } from './products';
import { createPurchaseHistoryTable, dropPurchaseHistoryTable } from './purchase';
import { createUsersTable, dropUsersTable } from './users';
import { createShoppingCartTable, dropShoppingCartTable } from './shoppingCart';

export const executeQueryArray = async queries => {
  for (const query of queries) {
    await pool.query(query);
  }
};

export const dropTables = () => executeQueryArray([ 
  dropShoppingCartTable,
  dropProductsTable,
  dropPurchaseHistoryTable,
  dropUsersTable,
]);

export const createTables = () => executeQueryArray([
  createProductsTable,
  createShoppingCartTable,
  createPurchaseHistoryTable,
  createUsersTable,
]);

export const populateTables = () => executeQueryArray([
  populateProductsTable,
]);