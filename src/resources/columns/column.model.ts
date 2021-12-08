import { v4 as uuid } from 'uuid';

export interface ColumnInterface {
  readonly id: string;
  title: string;
  order: number;
}

export class Column implements ColumnInterface {
  readonly id: string;

  title: string;

  order: number;

  constructor({ id = uuid(), title = 'COLUMN_TITLE', order = 1 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
