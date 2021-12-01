const uuid = require('uuid');

class Board {
  constructor({ id = uuid.v4(), title = 'BOARD_TITLE', columns = null } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /* static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  } */
}

module.exports = Board;
