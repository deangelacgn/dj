import { BaseModel } from './base';

class InventoryModel extends BaseModel {
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

    let paramId = 2;

    Object.keys(data).forEach(column => {
      if (data[column] !== undefined) {
        columns.push(`${column} = $${paramId}`);
        values.push(data[column]);
        paramId += 1;
      }
    });

    const query = `
      UPDATE ${this.table}
      SET ${columns.join(', ')}
      WHERE id = $1
      RETURNING *
    `;

    return this.pool.query(query, values);
  }

  async deleteProduct(productId) {
    const query = `
      DELETE FROM ${this.table} WHERE id = $1
      RETURNING *
    `;

    return this.pool.query(query, [productId]);
  }
}

export const inventoryModel = new InventoryModel();