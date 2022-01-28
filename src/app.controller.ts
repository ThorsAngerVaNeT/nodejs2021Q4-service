import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Logger,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { AppService } from './app.service';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService,
    private authService: AuthService
  ) {}

  /* @Get()
  getHello(): string {
    return this.appService.getHello();
  } */

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
