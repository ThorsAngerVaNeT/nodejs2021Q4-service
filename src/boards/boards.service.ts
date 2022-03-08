import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { ColumnEntity } from '../columns/entities/column.entity';
import { EntityNotFoundException } from '../exceptions/not-found.exception';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    createBoardDto.columns = await this.columnsRepository.save(
      createBoardDto.columns
    );
    const board = await this.boardsRepository.save(createBoardDto);
    return this.findOne(board.id);
  }

  findAll(): Promise<Board[]> {
    return this.boardsRepository
      .createQueryBuilder('Boards')
      .leftJoinAndSelect('Boards.columns', 'Columns')
      .where('Columns.boardId = Boards.id')
      .orderBy('Columns.order', 'ASC')
      .getMany();
  }

  async findOne(id: string): Promise<Board> {
    const board = await this.boardsRepository
      .createQueryBuilder('Boards')
      .leftJoinAndSelect('Boards.columns', 'Columns')
      .where('Columns.boardId = Boards.id AND Boards.id = :id', { id })
      .orderBy('Columns.order', 'ASC')
      .getOne();
    if (!board) throw new EntityNotFoundException('Board', id);
    return board;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    await this.findOne(id);
    const columns = await this.columnsRepository.save(updateBoardDto.columns);
    const board = await this.boardsRepository.save({
      id,
      title: updateBoardDto.title,
      columns,
    });
    return this.findOne(board.id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.boardsRepository.delete(id);
  }
}
