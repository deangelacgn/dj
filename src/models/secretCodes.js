import { BaseModel } from './base';

class SecretCodeModel extends BaseModel {
  constructor() {
    super('secret_codes');
  }

  async addSecretCode(values) {
    const query = `
      INSERTO INTO ${this.table}(code, user_id, expiration_date)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    return this.pool.query(query, values);
  }

  async deleteSecretCode(id) {
    const query = `
    DELETE FROM ${this.table}
    WHERE id = $1
    RETURNING *
    `;

    return this.pool.query(query, [id]);
  }
}

export const secretCodeModel = new SecretCodeModel();