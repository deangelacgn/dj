import { pool } from './pool';

export class BaseModel {
  constructor(tableName) {
    this.pool = pool;
    this.table = tableName;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select(columns, clause, values) {
    let query = `SELECT ${columns} FROM ${this.table} `;
    if (clause !== undefined) {
      query += clause;
    }
    return this.pool.query(query, values);
  }
}