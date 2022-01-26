import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { ColumnEntity } from 'src/columns/entities/column.entity';
import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
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
  @ManyToOne(() => ColumnEntity, {
    onDelete: 'SET NULL',
  })
  column: ColumnEntity | undefined;
}
