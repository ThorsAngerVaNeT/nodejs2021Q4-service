import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsUUID(4)
  @ApiProperty()
  @IsOptional()
  id: string;

  @IsOptional()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  // @IsAlphanumeric()
  login: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
