import { BaseModel } from './base';

export class ShoppingCartModel extends BaseModel {
  constructor () {
    super('shopping_cart');
  }

  async addItem(columns, values) {
    const query = `
      INSERT INTO ${this.table}(${columns})
      VALUES ($1, $2)
      RETURNING id, ${columns}
    `;

    return this.pool.query(query, values);
  }

  async removeItem(id) {
    const query = `
      DELETE FROM ${this.table} WHERE id = $1
      RETURNING *
    `;

    return this.pool.query(query, [id]);
  }

  async updateItem(id, quantity) {
    
    const query = `
      UPDATE ${this.table}
      SET quantity = $1
      WHERE id = $2
      RETURNING *
    `;

    return this.pool.query(query, [quantity, id]);
  }

  async clear() {
    const query = `
    DELETE FROM ${this.table}
    `;

    return this.pool.query(query);
  }
}

export const shoppingCartModel = new ShoppingCartModel();