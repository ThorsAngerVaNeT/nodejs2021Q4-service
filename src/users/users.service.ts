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

  async create(createUserDto: CreateUserDto): Promise<User> {
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

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const isExist = await this.findOne(id);
    if (undefined === isExist) return isExist;
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

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
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
