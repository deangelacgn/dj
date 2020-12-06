import { pool } from '../models/pool';
import { dropProductsTable, createProductsTable } from './products';
import { createPurchaseHistoryTable, dropPurchaseHistoryTable } from './purchase';
import { createUsersTable, dropUsersTable } from './users';
import { createShoppingCartTable, dropShoppingCartTable } from './shoppingCart';

export const executeQueryArray = async queries => {
  for (const query of queries) {
    await pool.query(query);
  }
};

export const dropTables = () => executeQueryArray([ 
  dropProductsTable,
  dropPurchaseHistoryTable,
  dropUsersTable,
  dropShoppingCartTable,
]);
export const createTables = () => executeQueryArray([
  createProductsTable,
  createPurchaseHistoryTable,
  createUsersTable,
  createShoppingCartTable,
]);