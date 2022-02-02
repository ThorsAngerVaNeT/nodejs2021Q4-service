import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsOptional, IsArray } from 'class-validator';
import { CreateColumnDto } from '../../columns/dto/create-column.dto';

export class CreateBoardDto {
  @IsUUID(4)
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Autotest board',
  })
  title: string;

  @IsArray()
  @ApiProperty({
    type: [CreateColumnDto],
    example: [
      { title: 'Backlog', order: 1 },
      { title: 'Sprint', order: 2 },
    ],
  })
  columns: CreateColumnDto[];
}
