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
}
