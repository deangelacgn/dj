import { pool } from '../models/pool';
import {
  dropMessagesTable,
  createMessageTable,
} from './queries';

export const executeQueryArray = async queries => {
  for (const query of queries) {
    await pool.query(query);
  }
};

export const dropTables = () => executeQueryArray([ dropMessagesTable ]);
export const createTables = () => executeQueryArray([ createMessageTable ]);