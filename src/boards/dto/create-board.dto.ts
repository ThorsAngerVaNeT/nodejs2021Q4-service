import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested, IsString } from 'class-validator';
import { CreateColumnDto } from '../../columns/dto/create-column.dto';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Autotest board',
  })
  title: string;

  @ValidateNested({ each: true })
  @Type(() => CreateColumnDto)
  @ApiProperty({
    type: [CreateColumnDto],
    example: [
      { title: 'Backlog', order: 1 },
      { title: 'Sprint', order: 2 },
    ],
  })
  columns: CreateColumnDto[];
}
