import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty({
    example: '0949f061-936e-4710-a48b-ab1af2d1c284',
  })
  id: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Autotest task',
  })
  title: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: 0,
  })
  order: number;

  @IsOptional()
  @ApiProperty({
    example: 'Lorem ipsum',
  })
  description: string;

  @IsUUID(4)
  @IsOptional()
  @ApiProperty({
    example: '5bfab79b-7add-4399-a817-cb82175d754d',
  })
  userId: string;

  @IsUUID(4)
  @IsOptional()
  @ApiProperty({
    example: '2a6989d7-19ca-45e8-a8fb-b5ee7d9071fd',
  })
  boardId: string;

  @IsUUID(4)
  @IsOptional()
  @ApiProperty({
    example: '323f4e35-9361-444e-ad09-381c713919b3',
  })
  columnId: string;
}
