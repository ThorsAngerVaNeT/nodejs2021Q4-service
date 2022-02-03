import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityNotFoundException } from '../exceptions/not-found.exception';

@Injectable()
export class UsersService {
  constructor(
    private config: ConfigService,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {
    this.config = config;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.isLoginExist(createUserDto.login);
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      +this.config.get('SALT_ROUNDS')
    );
    const user = await this.usersRepository.save(createUserDto);
    // delete user.password;
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new EntityNotFoundException('User', id);
    return user;
  }

  async findOneByLogin(login: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { login },
      select: ['id', 'name', 'login', 'password'],
    });
  }

  async isLoginExist(login: string, id: string = null) {
    const user = await this.findOneByLogin(login);
    if (user && user.id !== id)
      throw new ConflictException('Login already exists.');
    return !!user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id);
    await this.isLoginExist(updateUserDto.login, id);
    updateUserDto.password = await bcrypt.hash(
      updateUserDto.password,
      +this.config.get('SALT_ROUNDS')
    );
    const user = await this.usersRepository.save({
      ...updateUserDto,
      id,
    });
    // delete user.password;
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.usersRepository.delete(id);
  }
}
