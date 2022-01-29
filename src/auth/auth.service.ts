import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// import { UserDto } from 'src/users/dto/user.dto';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(login: string, password: string): Promise<UserDto> {
    const user = await this.usersService.findOneByLogin(login);

    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = { userId: user.id, login: user.login };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
