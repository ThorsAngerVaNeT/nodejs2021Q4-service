import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ColumnEntity } from 'src/columns/entities/column.entity';

export class CreateBoardDto {
  @IsUUID(4)
  @IsOptional()
  id: string;

  @IsNotEmpty()
  title: string;

  columns: ColumnEntity[];
}
