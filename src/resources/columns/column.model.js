const uuid = require('uuid');

class Board {
  constructor({ id = uuid.v4(), title = 'COLUMN_TITLE', order = null } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  /* static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  } */
}

module.exports = Board;
