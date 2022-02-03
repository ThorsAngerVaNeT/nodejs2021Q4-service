import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsUUID, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty({
    example: 'fec629cb-b440-419a-b479-b374127f477a',
  })
  id: string;

  @IsNotEmpty()
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
  @Exclude({ toPlainOnly: true })
  @ApiProperty({
    example: 'T35t_P@55w0rd',
  })
  password: string;
}
