import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateColumnDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Backlog',
  })
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  order: number;

  @IsUUID(4)
  @IsOptional()
  @ApiProperty({
    example: '2a6989d7-19ca-45e8-a8fb-b5ee7d9071fd',
  })
  boardId: string;
}
