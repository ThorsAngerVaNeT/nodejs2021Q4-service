import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { ColumnEntity } from 'src/columns/entities/column.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = createBoardDto;
    board.columns = await this.columnsRepository.save(createBoardDto.columns);
    return this.boardsRepository.save(createBoardDto);
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
    if (!board) throw new NotFoundException('Board not found.');
    return board;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const isExist = !!(await this.findOne(id));
    if (!isExist) throw new NotFoundException('Board not found.');
    const columns = await this.columnsRepository.save(updateBoardDto.columns);
    const board = await this.boardsRepository.save({
      id,
      title: updateBoardDto.title,
      columns,
    });
    return board;
  }

  async remove(id: string): Promise<void> {
    const isExist = !!(await this.findOne(id));
    if (!isExist) throw new NotFoundException('Board not found.');
    await this.boardsRepository.delete(id);
  }
}
