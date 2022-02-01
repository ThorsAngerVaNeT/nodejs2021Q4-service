import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { EntityNotFoundException } from '../exceptions/not-found.exception';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnEntity } from './entities/column.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>,
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>
  ) {}

  async create(createColumnDto: CreateColumnDto) {
    const isExist = !!(await this.boardsRepository.findOne(
      createColumnDto.boardId
    ));
    if (!isExist)
      throw new EntityNotFoundException('Column', createColumnDto.boardId);
    console.log(createColumnDto);
    return this.columnsRepository.save(createColumnDto);
  }

  findAll() {
    return `This action returns all columns`;
  }

  findOne(id: string) {
    return `This action returns a #${id} column`;
  }

  update(id: string, updateColumnDto: UpdateColumnDto) {
    return `This action updates a #${id} column`;
  }

  remove(id: string) {
    return `This action removes a #${id} column`;
  }
}
