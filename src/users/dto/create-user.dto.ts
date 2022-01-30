import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsUUID(4)
  @IsOptional()
  id: string;

  @IsOptional()
  @ApiProperty({
    example: 'TEST_USER',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'test_user',
  })
  login: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'T35t_P@55w0rd',
  })
  @Exclude({ toPlainOnly: true })
  password: string;
}
