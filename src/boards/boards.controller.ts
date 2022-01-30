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
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@ApiTags('Boards')
@ApiBearerAuth('token')
@ApiForbiddenResponse({ description: 'Access token is missing or invalid.' })
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The board has been created.',
    type: UpdateBoardDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiCreatedResponse({ description: 'The board has been created.' })
  async create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Successful operation.',
    type: [UpdateBoardDto],
  })
  async findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Successful operation.', type: UpdateBoardDto })
  @ApiNotFoundResponse({ description: 'Board not found.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const board = await this.boardsService.findOne(id);
    if (!board) {
      throw new NotFoundException('Board not found.');
    }
    return board;
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'The board has been updated.',
    type: UpdateBoardDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiNotFoundResponse({ description: 'Board not found.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBoardDto: UpdateBoardDto
  ) {
    const board = await this.boardsService.update(id, updateBoardDto);
    if (!board) {
      throw new NotFoundException('Board not found.');
    }
    return board;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'The board has been deleted' })
  @ApiNotFoundResponse({ description: 'Board not found.' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const remove = await this.boardsService.remove(id);
    if (!remove) {
      throw new NotFoundException('Board not found.');
    }
    return remove;
  }
}
