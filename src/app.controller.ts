import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
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
  @HttpCode(200)
  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description: 'Logins a user and returns a JWT-token.',
  })
  @ApiTags('Login')
  @ApiOkResponse({ description: 'Successful login.' })
  @ApiForbiddenResponse({ description: 'Incorrect login or password.' })
  async login(
    @Request() req: { user: User },
    @Body() LoginUserDto: LoginUserDto
  ) {
    return this.authService.login(req.user);
  }
}
