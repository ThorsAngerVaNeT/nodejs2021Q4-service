import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateColumnDto {
  @IsUUID(4)
  @IsOptional()
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

  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty({
    example: '2a6989d7-19ca-45e8-a8fb-b5ee7d9071fd',
  })
  boardId: string;
}
