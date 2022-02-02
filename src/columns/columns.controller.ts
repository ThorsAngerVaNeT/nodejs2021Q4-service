import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@ApiTags('Columns')
@ApiBearerAuth('token')
@ApiOkResponse({ description: 'Successful operation.' })
@ApiForbiddenResponse({ description: 'Access token is missing or invalid.' })
@Controller('/boards/:boardId/columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new column',
    description: 'Creates a new column',
  })
  @ApiCreatedResponse({
    description: 'The column has been created.',
    type: UpdateColumnDto,
  })
  async create(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() createColumnDto: CreateColumnDto
  ) {
    return this.columnsService.create({ ...createColumnDto, boardId });
  }

  @Get()
  @ApiOperation({
    summary: 'Get Columns by boardId',
    description:
      'Gets columns by the Board ID (e.g. "/board/2a6989d7-19ca-45e8-a8fb-b5ee7d9071fd/columns")',
  })
  @ApiOkResponse({
    description: 'Successful operation.',
    type: [UpdateColumnDto],
  })
  async findAll(@Param('boardId', ParseUUIDPipe) boardId: string) {
    return this.columnsService.findAll(boardId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get Column by boardId and columnId',
    description:
      'Gets the Column by the Board\'s and column ID (e.g. "/board/2a6989d7-19ca-45e8-a8fb-b5ee7d9071fd/columns/6a147549-cbeb-452d-a027-baf919ca3d64")',
  })
  @ApiOkResponse({
    description: 'Successful operation.',
    type: [UpdateColumnDto],
  })
  async findOne(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.columnsService.findOne(boardId, id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Updates Column',
    description: 'Updates the Column by ID',
  })
  @ApiOkResponse({
    description: 'The column has been updated.',
    type: [UpdateColumnDto],
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  async update(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateColumnDto: UpdateColumnDto
  ) {
    return this.columnsService.update(id, updateColumnDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete Column',
    description: 'Deletes Column by ID.',
  })
  @ApiNoContentResponse({ description: 'The column has been deleted' })
  @ApiNotFoundResponse({ description: 'Column not found.' })
  async remove(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.columnsService.remove(id);
  }
}
