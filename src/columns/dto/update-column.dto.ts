import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsNotEmpty } from 'class-validator';
import { CreateColumnDto } from './create-column.dto';

export class UpdateColumnDto extends PartialType(CreateColumnDto) {
  @IsUUID(4)
  @IsOptional()
  @ApiProperty({
    example: '02f9c173-bfd9-4079-ac04-f8a0a8bd266f',
  })
  id: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Backlog',
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 1,
  })
  order: number;
}
