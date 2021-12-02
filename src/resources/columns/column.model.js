const uuid = require('uuid');

class Board {
  constructor({ id = uuid.v4(), title = 'COLUMN_TITLE', order = 1 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Board;
