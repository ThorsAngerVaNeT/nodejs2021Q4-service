import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'admin',
  })
  readonly login: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'admin',
  })
  readonly password: string;
}
