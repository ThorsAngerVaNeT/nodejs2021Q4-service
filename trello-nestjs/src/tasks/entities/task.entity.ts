import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { Columns } from 'src/columns/entities/column.entity';
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
  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user: User | undefined;

  @Index()
  @ManyToOne(() => Board, {
    onDelete: 'CASCADE',
  })
  board: Board | undefined;

  @Index()
  @ManyToOne(() => Columns, {
    onDelete: 'SET NULL',
  })
  column: Columns | undefined;
}
