const uuid = require('uuid');

class Task {
  constructor({
    id = uuid.v4(),
    title = 'TASK_TITLE',
    order = null,
    description = 'TASK_DESC',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /* static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  } */
}

module.exports = Task;
