import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'TEST_USER',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'test_user',
  })
  login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Exclude({ toPlainOnly: true })
  @ApiProperty({
    example: 'T35t_P@55w0rd',
  })
  password: string;
}
