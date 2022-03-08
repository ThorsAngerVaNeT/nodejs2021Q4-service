import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, IsNotEmpty, ValidateNested, IsString } from 'class-validator';
import { UpdateColumnDto } from '../../columns/dto/update-column.dto';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty({
    example: 'b4752913-3cea-420d-bd43-db4141ad2807',
  })
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Autotest board',
  })
  title: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateColumnDto)
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
  columns: UpdateColumnDto[];
}
