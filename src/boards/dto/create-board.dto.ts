import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { CreateColumnDto } from 'src/columns/dto/create-column.dto';
import { ColumnEntity } from 'src/columns/entities/column.entity';

export class CreateBoardDto {
  @IsUUID(4)
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Autotest board',
  })
  title: string;

  @ApiProperty({
    type: [CreateColumnDto],
    example: [
      { title: 'Backlog', order: 1 },
      { title: 'Sprint', order: 2 },
    ],
  })
  columns: ColumnEntity[];
}
