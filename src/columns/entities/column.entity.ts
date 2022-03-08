import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Board } from '../../boards/entities/board.entity';

@Entity({ name: 'column', orderBy: { order: 'ASC' } })
export class ColumnEntity {
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

  @Column('uuid', { nullable: true })
  boardId: string;
}
