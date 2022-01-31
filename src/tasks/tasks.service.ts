import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { EntityNotFoundException } from '../exceptions/not-found.exception';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const board = !!(await this.boardsRepository.findOne(
      createTaskDto.boardId
    ));
    if (!board)
      throw new EntityNotFoundException('Board', createTaskDto.boardId);
    return this.tasksRepository.save(createTaskDto);
  }

  async findAll(boardId: string) {
    return this.tasksRepository.find({ where: { boardId } });
  }

  async findOne(boardId: string, id: string) {
    const task = await this.tasksRepository.findOne({ where: { boardId, id } });
    if (!task) throw new EntityNotFoundException('Task', id);
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const isExist = !!(await this.findOne(updateTaskDto.boardId, id));
    if (!isExist) throw new EntityNotFoundException('Task', id);
    return this.tasksRepository.save({ ...updateTaskDto, id });
  }

  async remove(id: string): Promise<void> {
    const isExist = !!(await this.tasksRepository.findOne(id));
    if (!isExist) throw new EntityNotFoundException('Task', id);
    await this.tasksRepository.delete(id);
  }
}
