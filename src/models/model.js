import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select(columns, clause, values) {
    let query = `SELECT ${columns} FROM ${this.table} `;
    if (clause !== undefined) {
      query += clause;
    }
    return this.pool.query(query, values);
  }

  async insertWithReturn(columns, values) {
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES ($1, $2)
          RETURNING id, ${columns}
      `;
    return this.pool.query(query, values);
  }
}

export default Model;