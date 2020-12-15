import { BaseModel } from './base';

class UserModel extends BaseModel {
  constructor() {
    super('users');
  }

  async registerUser(columns, values) {
    const query = `
      INSERT INTO ${this.table}(${columns})
      VALUES ($1, $2, $3, $4)
      RETURNING id, ${columns}
    `;

    return this.pool.query(query, values);
  }

  async updatePassword(id, password) {
    const query = `
      UPDATE ${this.table}
      SET password = $1
      WHERE id = $2
      RETURNING *
    `;
    return this.pool.query(query, [id, password]);
  }

}

export const userModel = new UserModel();