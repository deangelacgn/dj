import { BaseModel } from './base';

class InventoryModel extends BaseModel {
  constructor() {
    super('inventory');
  }

  async insertProduct(columns, values) {
    const query = `
      INSERT INTO ${this.table}(${columns})
      VALUES ($1, $2, $3)
      RETURNING product_id, ${columns}
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

  async searchProduct(searchPattern, numResults, offset) {
    let searchData = searchPattern.replace("%", "\%");
    searchData = searchData.replace("_", "\_");
    searchData = searchData.split(" ");

    const likeQueries = [];

    for(let paramId=1; paramId <= searchData.length; paramId++) {
      if (paramId !== searchData.length) {
        likeQueries.push(`LIKE $${paramId} OR `);
      } else{
        likeQueries.push(`LIKE $${paramId} `);
      }
    }

    searchData.push(numResults);
    searchData.push(offset);

    const query = `
      SELECT name FROM ${this.table}
      WHERE name
      ${likeQueries.join()}
      LIMIT $${likeQueries.length+1}
      ORDER BY name ASC
      OFFSET $${likeQueries.length+2} ROWS
    `;

    return this.pool.query(query, searchData);
  }
}

export const inventoryModel = new InventoryModel();