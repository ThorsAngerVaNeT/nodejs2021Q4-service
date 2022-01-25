import { Columns } from 'src/columns/entities/column.entity';

export class CreateBoardDto {
  title: string;
  columns: Columns[];
}
