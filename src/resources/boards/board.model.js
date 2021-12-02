const uuid = require('uuid');
const Column = require('../columns/column.model');

class Board {
  constructor({
    id = uuid.v4(),
    title = 'BOARD_TITLE',
    columns = [new Column()],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((el) => new Column(el));
  }
}

module.exports = Board;
