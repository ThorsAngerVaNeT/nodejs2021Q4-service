import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsNotEmpty } from 'class-validator';
import { UpdateColumnDto } from 'src/columns/dto/update-column.dto';
import { ColumnEntity } from 'src/columns/entities/column.entity';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsUUID(4)
  @IsOptional()
  @ApiProperty({
    example: 'b4752913-3cea-420d-bd43-db4141ad2807',
  })
  id: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Autotest board',
  })
  title: string;

  @ApiProperty({
    type: [UpdateColumnDto],
    example: [
      {
        id: 'b47ec433-4963-42d9-857f-029e1955d1ef',
        title: 'Backlog',
        order: 1,
      },
      {
        id: 'b0c5e35e-5bc9-40b2-86e2-0bd6ed5a293a',
        title: 'Sprint',
        order: 2,
      },
    ],
  })
  columns: ColumnEntity[];
}
