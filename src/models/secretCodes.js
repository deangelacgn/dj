import { BaseModel } from './base';

class SecretCodeModel extends BaseModel {
  constructor() {
    super('secret_codes');
  }

  async addSecretCode(secretCode, user_id, expirationDate) {
    const query = `
      INSERTO INTO ${this.table}(code, user_id, expiration_date)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    return this.pool.query(query, [secretCode, user_id, expirationDate]);
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