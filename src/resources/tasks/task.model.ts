import { v4 as uuid } from 'uuid';

export interface TaskInterface {
  readonly id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

export class Task implements TaskInterface {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor({
    id = uuid(),
    title = 'TASK_TITLE',
    order = 1,
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
