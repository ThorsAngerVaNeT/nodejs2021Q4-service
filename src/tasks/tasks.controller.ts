import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
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
  @ApiOperation({
    summary: 'Create new task',
    description: 'Creates a new task',
  })
  @ApiCreatedResponse({
    description: 'The task has been created.',
    type: UpdateTaskDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async create(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() createTaskDto: CreateTaskDto
  ) {
    return this.tasksService.create({ ...createTaskDto, boardId });
  }

  @Get()
  @ApiOperation({
    summary: 'Get Tasks by boardId',
    description:
      'Gets tasks by the Board ID (e.g. "/board/2a6989d7-19ca-45e8-a8fb-b5ee7d9071fd/tasks")',
  })
  @ApiOkResponse({
    description: 'Successful operation.',
    type: [UpdateTaskDto],
  })
  async findAll(@Param('boardId', ParseUUIDPipe) boardId: string) {
    return await this.tasksService.findAll(boardId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get Task by boardId and taskId',
    description:
      'Gets the Task by the Board\'s and task ID (e.g. "/board/2a6989d7-19ca-45e8-a8fb-b5ee7d9071fd/tasks/0949f061-936e-4710-a48b-ab1af2d1c284")',
  })
  @ApiOkResponse({
    description: 'Successful operation.',
    type: [UpdateTaskDto],
  })
  async findOne(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return await this.tasksService.findOne(boardId, id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Updates Task',
    description: 'Updates the Task by ID',
  })
  @ApiOkResponse({
    description: 'The task has been updated.',
    type: [UpdateTaskDto],
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  async update(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return await this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete Task',
    description: 'Deletes Task by ID.',
  })
  @ApiNoContentResponse({ description: 'The task has been deleted' })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  async remove(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return await this.tasksService.remove(id);
  }
}
