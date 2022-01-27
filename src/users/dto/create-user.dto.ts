import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsAlphanumeric,
} from 'class-validator';

export class CreateUserDto {
  @IsUUID(4)
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
