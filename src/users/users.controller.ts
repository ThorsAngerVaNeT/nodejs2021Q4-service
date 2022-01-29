import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('Users')
@ApiBearerAuth('token')
@ApiForbiddenResponse({ description: 'Access token is missing or invalid.' })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The user has been created.',
    type: UserDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiConflictResponse({ description: 'Login already exists.' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    if (!user) throw new ConflictException('Login already exists.');
    return user;
  }

  @Get()
  @ApiOkResponse({ description: 'Successful operation.', type: [UserDto] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Successful operation.', type: UserDto })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  @Put(':id')
  @ApiOkResponse({ description: 'The user has been updated.', type: UserDto })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'The user has been deleted' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async remove(@Param('id') id: string) {
    const remove = await this.usersService.remove(id);
    if (!remove) {
      throw new NotFoundException('User not found.');
    }
    return remove;
  }
}
