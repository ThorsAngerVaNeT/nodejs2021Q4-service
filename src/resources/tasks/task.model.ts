import { v4 as uuid } from 'uuid';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { User } from '../users/user.model';
import { Board } from '../boards/board.model';
import { Columns } from '../columns/column.model';

@Entity({ name: 'Tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('varchar')
  title: string;

  @Column('smallint')
  order: number;

  @Column('text')
  description: string;

  @Index()
  @Column('uuid', { nullable: true })
  userId: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user: User | undefined;

  @Index()
  @Column('uuid', { nullable: true })
  boardId: string | null;

  @ManyToOne(() => Board, {
    onDelete: 'CASCADE',
  })
  board: Board | undefined;

  @Index()
  @Column('uuid', { nullable: true })
  columnId: string | null;

  @ManyToOne(() => Columns, {
    onDelete: 'SET NULL',
  })
  column: Columns | undefined;

  /**
   * Creates an instance of task
   * @param object - title, order, description, userId, boardId, columnId
   */
  constructor({
    id = uuid(),
    title = 'TASK_TITLE',
    order = 1,
    description = 'TASK_DESC',
    userId = null,
    boardId = null,
    columnId = null,
  }: Partial<Task> = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
