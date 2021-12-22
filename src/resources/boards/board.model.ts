import { v4 as uuid } from 'uuid';
import { Column } from '../columns/column.model';

export class Board {
  readonly id: string;

  title: string;

  columns: Column[];

  /**
   * Creates an instance of board
   * @param object - title, order, columns
   */
  constructor({
    title = 'BOARD_TITLE',
    columns = [new Column()],
  }: {
    title: string;
    columns: Column[];
  }) {
    this.id = uuid();
    this.title = title;
    this.columns = columns.map((el) => new Column(el));
  }
}
