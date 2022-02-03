import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { EntityNotFoundException } from '../exceptions/not-found.exception';
import { BoardsService } from '../boards/boards.service';
import { ColumnsService } from '../columns/columns.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @Inject(UsersService)
    private usersService: UsersService,
    @Inject(BoardsService)
    private boardsService: BoardsService,
    @Inject(ColumnsService)
    private columnsService: ColumnsService
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    if (createTaskDto.userId)
      await this.usersService.findOne(createTaskDto.userId);
    await this.boardsService.findOne(createTaskDto.boardId);
    if (createTaskDto.columnId)
      await this.columnsService.findOne(
        createTaskDto.boardId,
        createTaskDto.columnId
      );
    return this.tasksRepository.save(createTaskDto);
  }

  async findAll(boardId: string): Promise<Task[]> {
    return this.tasksRepository.find({ where: { boardId } });
  }

  async findOne(boardId: string, id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { boardId, id } });
    if (!task) throw new EntityNotFoundException('Task', id);
    return task;
  }

  async update(
    boardId: string,
    id: string,
    updateTaskDto: UpdateTaskDto
  ): Promise<Task> {
    await this.findOne(boardId, id);
    if (updateTaskDto.userId)
      await this.usersService.findOne(updateTaskDto.userId);
    await this.boardsService.findOne(updateTaskDto.boardId);
    if (updateTaskDto.columnId)
      await this.columnsService.findOne(
        updateTaskDto.boardId,
        updateTaskDto.columnId
      );
    return this.tasksRepository.save({ ...updateTaskDto, id });
  }

  async remove(boardId: string, id: string): Promise<void> {
    await this.findOne(boardId, id);
    await this.tasksRepository.delete(id);
  }
}
