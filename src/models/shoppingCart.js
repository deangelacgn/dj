import { BaseModel } from './base';

export class ShoppingCartModel extends BaseModel {
  constructor () {
    super('shopping_cart');
  }

  async addItem(columns, values) {
    const query = `
      INSERT INTO ${this.table}(${columns})
      VALUES ($1, $2)
      RETURNING product_id, ${columns}
    `;

    return this.pool.query(query, values);
  }

  async removeItem(productId) {
    const query = `
      DELETE FROM ${this.table} WHERE product_id = $1
      RETURNING *
    `;

    return this.pool.query(query, [productId]);
  }

  async updateItem(productId, quantity) {
    
    const query = `
      UPDATE ${this.table}
      SET quantity = $1
      WHERE product_id = $2
      RETURNING *
    `;

    return this.pool.query(query, [quantity, productId]);
  }

  async clear() {
    const query = `
    DELETE FROM ${this.table}
    `;

    return this.pool.query(query);
  }
}

export const shoppingCartModel = new ShoppingCartModel();