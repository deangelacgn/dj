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

  async updateProductInfo(id, data) {
    const columns = [];
    const values = [id];

    Object.keys(data).forEach((column, i) => {
      if (data[column] !== undefined) {
        columns.push(`${column} = $${i + 2}`);
        values.push(data[column]);
      }
    });

    const query = `
      update ${this.table}
      set ${columns.join(', ')}
      where id = $1
    `;

    return this.pool.query(query, values);
  }

  async deleteProduct(productId) {
    const query = `
      DELETE FROM ${this.table} WHERE id = $1
    `;
    return this.pool.query(query, productId);
  }
}