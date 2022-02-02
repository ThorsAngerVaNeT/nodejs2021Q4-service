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

  async create(createColumnDto: CreateColumnDto): Promise<ColumnEntity> {
    const isExist = !!(await this.boardsRepository.findOne(
      createColumnDto.boardId
    ));
    if (!isExist)
      throw new EntityNotFoundException('Board', createColumnDto.boardId);
    return this.columnsRepository.save(createColumnDto);
  }

  async findAll(boardId: string): Promise<ColumnEntity[]> {
    return this.columnsRepository.find({ where: { boardId } });
  }

  async findOne(boardId: string, id: string): Promise<ColumnEntity> {
    const column = await this.columnsRepository.findOne({
      where: { boardId, id },
    });
    if (!column) throw new EntityNotFoundException('Column', id);
    return column;
  }

  async update(
    id: string,
    updateColumnDto: UpdateColumnDto
  ): Promise<ColumnEntity> {
    const isExist = !!(await this.findOne(updateColumnDto.boardId, id));
    if (!isExist) throw new EntityNotFoundException('Column', id);
    return this.columnsRepository.save({ ...updateColumnDto, id });
  }

  async remove(id: string): Promise<void> {
    const isExist = !!(await this.columnsRepository.findOne(id));
    if (!isExist) throw new EntityNotFoundException('Column', id);
    await this.columnsRepository.delete(id);
  }
}
