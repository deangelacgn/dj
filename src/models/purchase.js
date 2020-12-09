import { BaseModel } from './base';
import { shoppingCartModel } from './shoppingCart';
import { productsModel } from './products';

class PurchaseModel extends BaseModel {
  constructor () {
    super('purchases');
  }

  async computeTotalCost() {
    const query = `
    SELECT SUM( quantity *  cost_per_unit) AS total FROM ${shoppingCartModel.table}
    INNER JOIN ${productsModel.table} ON product_id =  item_id
    `;
    const purchase_cost = await this.pool.query(query);
    return purchase_cost[0];
  }

  async addPurchaseToHistory(columns, values) {
    const query = `
    INSERT INTO ${this.table}(${columns})
    VALUES ($1, $2, $3)
    RETURNING id, ${columns}
    `;

    return this.pool.query(query, values);
  }

}

export const purchaseModel = new PurchaseModel();