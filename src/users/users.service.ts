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
    const isExist = !!(await this.findOneByLogin(createUserDto.login));
    if (isExist) throw new ConflictException('Login already exists.');
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const isExist = !!(await this.findOne(id));
    if (!isExist) throw new EntityNotFoundException('User', id);
    const userByLogin = await this.findOneByLogin(updateUserDto.login);
    if (userByLogin && userByLogin.id !== id)
      throw new ConflictException('Login already exists.');
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
    const isExist = !!(await this.findOne(id));
    if (!isExist) throw new EntityNotFoundException('User', id);
    await this.usersRepository.delete(id);
  }
}
