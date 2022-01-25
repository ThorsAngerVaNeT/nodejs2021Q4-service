import { PartialType } from '@nestjs/mapped-types';
import { ColumnEntity } from 'src/columns/entities/column.entity';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  id: string;
  title: string;
  columns: ColumnEntity[];
}
