import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { Columns } from 'src/columns/entities/column.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(Columns)
    private columnsRepository: Repository<Columns>,
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

  findOne(id: string): Promise<Board> {
    return this.boardsRepository
      .createQueryBuilder('Boards')
      .leftJoinAndSelect('Boards.columns', 'Columns')
      .where('Columns.boardId = Boards.id AND Boards.id = :id', { id })
      .orderBy('Columns.order', 'ASC')
      .getOne();
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const isExist = await this.findOne(id);
    if (undefined === isExist) return isExist;
    const columns = await this.columnsRepository.save(updateBoardDto.columns);
    const board = await this.boardsRepository.save({
      id,
      title: updateBoardDto.title,
      columns,
    });
    return board;
  }

  async remove(id: string): Promise<void> {
    await this.boardsRepository.delete(id);
  }
}
