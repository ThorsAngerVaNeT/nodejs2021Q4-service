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
  name: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  login: string;

  @IsNotEmpty()
  password: string;
}
