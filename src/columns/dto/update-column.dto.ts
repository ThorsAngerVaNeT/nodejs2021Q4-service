import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateColumnDto {
  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty({
    example: '02f9c173-bfd9-4079-ac04-f8a0a8bd266f',
  })
  id: string;

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
  @IsNotEmpty()
  @ApiProperty({
    example: '2a6989d7-19ca-45e8-a8fb-b5ee7d9071fd',
  })
  boardId: string;
}
