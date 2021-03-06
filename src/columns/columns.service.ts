import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from '../exceptions/not-found.exception';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnEntity } from './entities/column.entity';
import { BoardsService } from '../boards/boards.service';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>,
    @Inject(BoardsService)
    private boardsService: BoardsService
  ) {}

  async create(createColumnDto: CreateColumnDto): Promise<ColumnEntity> {
    await this.boardsService.findOne(createColumnDto.boardId);
    await this.reOrder(createColumnDto.boardId, createColumnDto.order);
    return this.columnsRepository.save(createColumnDto);
  }

  async reOrder(boardId: string, order: number) {
    return await this.columnsRepository
      .createQueryBuilder()
      .update(ColumnEntity)
      .set({ order: () => '"order" + 1' })
      .where('boardId = :boardId AND order >= :order', {
        boardId: boardId,
        order: order,
      })
      .execute();
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
    await this.findOne(updateColumnDto.boardId, id);
    await this.reOrder(updateColumnDto.boardId, updateColumnDto.order);
    return this.columnsRepository.save({ ...updateColumnDto, id });
  }

  async remove(boardId: string, id: string): Promise<void> {
    await this.findOne(boardId, id);
    await this.columnsRepository.delete(id);
  }
}
