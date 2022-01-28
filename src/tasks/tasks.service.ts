import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return this.tasksRepository.save(createTaskDto);
  }

  findAll(boardId: string) {
    return this.tasksRepository.find({ where: { boardId } });
  }

  findOne(boardId: string, id: string) {
    return this.tasksRepository.findOne({ where: { boardId, id } });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const isExist = await this.findOne(updateTaskDto.boardId, id);
    if (!isExist) return isExist;
    return this.tasksRepository.save({ ...updateTaskDto, id });
  }

  async remove(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
