import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('Tasks')
@ApiBearerAuth('token')
@ApiForbiddenResponse({ description: 'Access token is missing or invalid.' })
@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The task has been created.',
    type: UpdateTaskDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto
  ) {
    return this.tasksService.create({ ...createTaskDto, boardId });
  }

  @Get()
  @ApiOkResponse({
    description: 'Successful operation.',
    type: [UpdateTaskDto],
  })
  findAll(@Param('boardId') boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Successful operation.',
    type: [UpdateTaskDto],
  })
  async findOne(@Param('boardId') boardId: string, @Param('id') id: string) {
    const task = await this.tasksService.findOne(boardId, id);
    if (!task) {
      throw new NotFoundException('Task not found.');
    }
    return task;
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'The task has been updated.',
    type: [UpdateTaskDto],
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  async update(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    const task = await this.tasksService.update(id, updateTaskDto);
    if (!task) {
      throw new NotFoundException('Task not found.');
    }
    return task;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'The task has been deleted' })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  async remove(@Param('boardId') boardId: string, @Param('id') id: string) {
    const remove = await this.tasksService.remove(id);
    if (!remove) {
      throw new NotFoundException('Task not found.');
    }
    return remove;
  }
}
