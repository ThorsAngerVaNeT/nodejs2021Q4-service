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
    id = uuid(),
    title = 'BOARD_TITLE',
    columns = [new Column()],
  }: {
    id: string;
    title: string;
    columns: Column[];
  }) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((el) => new Column(el));
  }
}
