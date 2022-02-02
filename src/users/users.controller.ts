import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  ParseUUIDPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
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
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { plainToClass } from 'class-transformer';
import { User } from './entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth('token')
@ApiForbiddenResponse({ description: 'Access token is missing or invalid.' })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Create user', description: 'Creates a new user' })
  @ApiCreatedResponse({
    description: 'The user has been created.',
    type: UserDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiConflictResponse({ description: 'Login already exists.' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return plainToClass(User, user);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Gets all users', description: 'Gets all users' })
  @ApiOkResponse({ description: 'Successful operation.', type: [UserDto] })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'Gets user by ID',
    description:
      'Gets a user by ID e.g. "/users/fec629cb-b440-419a-b479-b374127f477a"',
  })
  @ApiOkResponse({ description: 'Successful operation.', type: UserDto })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'Updates a user',
    description: 'Updates a user by ID',
  })
  @ApiOkResponse({ description: 'The user has been updated.', type: UserDto })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    return plainToClass(User, user);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete user',
    description: "Deletes user by ID. It also unassignes all user's tasks",
  })
  @ApiNoContentResponse({ description: 'The user has been deleted' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.remove(id);
  }
}
