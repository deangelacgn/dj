import { BaseModel } from './base';

class ProductsModel extends BaseModel {
  constructor() {
    super('products');
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

  async searchProduct(searchPattern, numResults, offset) {
    let searchData = searchPattern.replace(/%/g, "\\%");
    searchData = searchData.replace("_", "\\_");
    searchData = searchData.split(" ");
    searchData = searchData.filter(str => str.length !== 0);
    searchData = searchData.map(word => `%${word}%`);

    const likeQueries = [];
    const orderingByLikeQueries = [];

    for(let paramId=1; paramId <= searchData.length; paramId++) {
      likeQueries.push(`name LIKE $${paramId}`);
      orderingByLikeQueries.push(`(name LIKE $${paramId})::int`);
    }

    let remainingParamIds = [1, 2]

    if (likeQueries.length === 0) {
      likeQueries.push("true");
    } else {
      remainingParamIds = remainingParamIds.map(x => x + likeQueries.length)
    }

    let orderingRules = orderingByLikeQueries.join(" + ");

    if (orderingRules.length !== 0) {
      orderingRules = orderingRules.concat(" DESC,");
    }

    searchData.push(numResults);
    searchData.push(offset);

    const query = `
      SELECT ${this.table}.*
      FROM ${this.table}
      WHERE
      ${likeQueries.join(" OR ")} 
      ORDER BY ${orderingRules} name ASC
      LIMIT $${remainingParamIds[0]} 
      OFFSET $${remainingParamIds[1]}
    `;

    return this.pool.query(query, searchData);
  }
}

export const productsModel = new ProductsModel();