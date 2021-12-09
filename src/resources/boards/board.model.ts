import { v4 as uuid } from 'uuid';
import { Column } from '../columns/column.model';

export interface BoardInterface {
  readonly id: string;
  title: string;
  columns: Column[];
}

export class Board implements BoardInterface {
  id: string;

  title: string;

  columns: Column[];

  constructor({
    id = uuid(),
    title = 'BOARD_TITLE',
    columns = [new Column()],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((el) => new Column(el));
  }
}