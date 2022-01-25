import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Columns } from 'src/columns/entities/column.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Columns, (column) => column.board, {
    eager: true,
  })
  columns!: Columns[];
}
