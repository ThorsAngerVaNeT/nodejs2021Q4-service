import { v4 as uuid } from 'uuid';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Board } from '../boards/board.model';

@Entity({ name: 'Columns' })
export class Columns {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('varchar')
  title: string;

  @Column('smallint')
  order: number;

  @Index()
  @ManyToOne(() => Board, (board) => board.columns, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  board?: Board;

  /**
   * Creates an instance of column
   * @param object - title, order
   */
  constructor({
    id = uuid(),
    title = 'COLUMN_TITLE',
    order = 1,
  }: Partial<Columns> = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
