import { BaseModel } from './base';

class SecretCodeModel extends BaseModel {
  constructor() {
    super('secret_codes');
  }

  async addSecretCode(secretCode) {
    const query = `
      INSERTO INTO ${this.table}(code)
      VALUES $1
      RETURNING *
    `;

    return this.pool.query(query, [secretCode]);
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