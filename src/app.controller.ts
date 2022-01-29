import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/public.decorator';
import { LoginUserDto } from './users/dto/login-user.dto';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Public()
  @ApiTags('')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiTags('Login')
  @ApiOkResponse({ description: 'Successful login.' })
  @ApiUnauthorizedResponse({ description: 'Incorrect login or password.' })
  async login(
    @Request() req: { user: User },
    @Body() LoginUserDto: LoginUserDto
  ) {
    return this.authService.login(req.user);
  }
}
