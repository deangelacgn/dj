import { BaseModel } from './base';

export class InventoryModel extends BaseModel {
  constructor() {
    super('inventory');
  }

  async insertProduct(columns, values) {
    const query = `
      INSERT INTO ${this.table}(${columns})
      VALUES ($1, $2, $3)
      RETURNING id, ${columns}
    `;
    return this.pool.query(query, values);
  }
}