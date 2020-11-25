import { pool } from '../models/pool';
import { dropMessagesTable, createMessageTable } from './messages';
import { dropInventoryTable, createInventoryTable } from './inventory';

export const executeQueryArray = async queries => {
  for (const query of queries) {
    await pool.query(query);
  }
};

export const dropTables = () => executeQueryArray([ dropInventoryTable, dropMessagesTable ]);
export const createTables = () => executeQueryArray([ createInventoryTable, createMessageTable ]);