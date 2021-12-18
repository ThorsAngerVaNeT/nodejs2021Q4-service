import { v4 as uuid } from 'uuid';

export class Column {
  readonly id: string;

  title: string;

  order: number;

  /**
   * Creates an instance of column
   * @param object - id, title, order
   */
  constructor({
    id = uuid(),
    title = 'COLUMN_TITLE',
    order = 1,
  }: {
    id: string;
    title: string;
    order: number;
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
