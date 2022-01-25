import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    return 'create a new board';
    /* const _board = createBoardDto;
    _board.columns = await getRepository(Column).save(columns);
    const newBoard = await getRepository(Board).save(_board); */
  }

  findAll() {
    return this.boardsRepository
      .createQueryBuilder('Boards')
      .leftJoinAndSelect('Boards.columns', 'Columns')
      .where('Columns.boardId = Boards.id')
      .orderBy('Columns.order', 'ASC')
      .getMany();
  }

  findOne(id: string) {
    return this.boardsRepository
      .createQueryBuilder('Boards')
      .leftJoinAndSelect('Boards.columns', 'Columns')
      .where('Columns.boardId = Boards.id AND Boards.id = :id', { id })
      .orderBy('Columns.order', 'ASC')
      .getOne();
  }

  update(id: string, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  async remove(id: string) {
    await this.boardsRepository.delete(id);
  }
}
