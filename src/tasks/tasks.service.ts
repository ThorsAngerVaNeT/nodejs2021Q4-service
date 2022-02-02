import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { EntityNotFoundException } from '../exceptions/not-found.exception';
import { ColumnEntity } from '../columns/entities/column.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const user = !!(await this.usersRepository.findOne(createTaskDto.userId));
    if (!user) throw new EntityNotFoundException('User', createTaskDto.boardId);
    const board = !!(await this.boardsRepository.findOne(
      createTaskDto.boardId
    ));
    if (!board)
      throw new EntityNotFoundException('Board', createTaskDto.boardId);
    const column = !!(await this.columnsRepository.findOne(
      createTaskDto.columnId
    ));
    if (!column)
      throw new EntityNotFoundException('Column', createTaskDto.columnId);
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
    const isExist = !!(await this.findOne(boardId, id));
    if (!isExist) throw new EntityNotFoundException('Task', id);
    const user = !!(await this.usersRepository.findOne(updateTaskDto.userId));
    if (!user) throw new EntityNotFoundException('User', updateTaskDto.boardId);
    const board = !!(await this.boardsRepository.findOne(
      updateTaskDto.boardId
    ));
    if (!board)
      throw new EntityNotFoundException('Board', updateTaskDto.boardId);
    const column = !!(await this.columnsRepository.findOne(
      updateTaskDto.columnId
    ));
    if (!column)
      throw new EntityNotFoundException('Column', updateTaskDto.columnId);
    return this.tasksRepository.save({ ...updateTaskDto, id });
  }

  async remove(boardId: string, id: string): Promise<void> {
    const isExist = !!(await this.findOne(boardId, id));
    if (!isExist) throw new EntityNotFoundException('Task', id);
    await this.tasksRepository.delete(id);
  }
}
