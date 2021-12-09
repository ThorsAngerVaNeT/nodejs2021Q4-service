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

  constructor(
    id: string,
    title: string,
    order: number,
    description: string,
    userId?: string | null,
    boardId?: string | null,
    columnId?: string | null
  ) {
    this.id = id || uuid();
    this.title = title || 'TASK_TITLE';
    this.order = order >= 0 ? order : 1;
    this.description = description || 'TASK_DESC';
    this.userId = userId || null;
    this.boardId = boardId || null;
    this.columnId = columnId || null;
  }
}
