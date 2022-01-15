import { v4 as uuid } from 'uuid';

export class Task {
  readonly id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  /**
   * Creates an instance of task
   * @param object - title, order, description, userId, boardId, columnId
   */
  constructor({
    title = 'TASK_TITLE',
    order = 1,
    description = 'TASK_DESC',
    userId = null,
    boardId = null,
    columnId = null,
  }: {
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string | null;
    columnId: string | null;
  }) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
