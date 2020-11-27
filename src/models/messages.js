import { BaseModel } from './base';

export class MessagesModel extends BaseModel {
  constructor() {
    super("messages");
  }

  async insertMessage(columns, values) {
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES ($1, $2)
          RETURNING id, ${columns}
      `;
    return this.pool.query(query, values);
  }
}

export const messagesModel = new MessagesModel();