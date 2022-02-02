import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Board } from '../boards/entities/board.entity';
import { User } from '../users/entities/user.entity';
import { ColumnEntity } from '../columns/entities/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Board, User, ColumnEntity])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
