import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Columns } from '../columns/column.model';

@Entity({ name: 'Boards' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('varchar')
  title: string;

  @OneToMany(() => Columns, (column) => column.board, {
    eager: true,
  })
  columns!: Columns[];

  /**
   * Creates an instance of board
   * @param object - title, order, columns
   */
  constructor({ id = uuid(), title = 'BOARD_TITLE' }: Partial<Board> = {}) {
    this.id = id;
    this.title = title;
  }
}
