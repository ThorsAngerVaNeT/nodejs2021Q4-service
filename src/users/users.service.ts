import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private config: ConfigService,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {
    this.config = config;
  }

  async create(createUserDto: CreateUserDto): Promise<User | boolean> {
    const isExist = !!(await this.findOneByLogin(createUserDto.login));
    if (isExist) return;
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      +this.config.get('SALT_ROUNDS')
    );
    const user = await this.usersRepository.save(createUserDto);
    delete user.password;
    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }

  findOneByLogin(login: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { login },
      select: ['id', 'name', 'login', 'password'],
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<User | undefined> {
    const isExist = !!(await this.findOne(id));
    if (!isExist) return;
    const userByLogin = await this.findOneByLogin(updateUserDto.login);
    if (userByLogin.id !== id) return;
    updateUserDto.password = await bcrypt.hash(
      updateUserDto.password,
      +this.config.get('SALT_ROUNDS')
    );
    const user = await this.usersRepository.save({
      ...updateUserDto,
      id,
    });
    return user;
  }

  async remove(id: string): Promise<boolean> {
    return !!(await this.usersRepository.delete(id)).affected;
  }

  /* async auth(
    login: string,
    password: string,
  ): Promise<User | undefined | null> {
    const user = await this.usersRepository.findOne({ login });
    if (!user) {
      return null;
    }
    const isPwdCorrect = await bcrypt.compare(password, user.password);

    if (isPwdCorrect) return user;

    return;
  } */
}
