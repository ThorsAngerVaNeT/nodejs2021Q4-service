import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty({
    example: 'fec629cb-b440-419a-b479-b374127f477a',
  })
  id: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'TEST_USER',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'test_user',
  })
  login: string;
}
