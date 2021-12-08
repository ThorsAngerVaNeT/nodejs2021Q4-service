import { STATUS_CODES } from 'http';
import { constants as httpConstants } from 'http2';
import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';
import { Board, BoardInterface } from './board.model';
import boardsService from './board.service';

interface boardParams {
  boardId: string;
}

type BoardRequest = FastifyRequest<{
  Body: BoardInterface;
}>;
type PutBoardRequest = FastifyRequest<{
  Body: BoardInterface;
  Params: boardParams;
}>;

const boardsRouter: FastifyPluginAsync = async (
  app: FastifyInstance
): Promise<void> => {
  app.get('/', async (_, res) => {
    const boards = await boardsService.getAll();
    res.send(boards);
  });

  app.get<{ Params: boardParams }>('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.getById(boardId);
    if (board) {
      res.send(board);
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  app.post('/', async (req: BoardRequest, res) => {
    const board = new Board(req.body);
    await boardsService.create(board);
    res.code(httpConstants.HTTP_STATUS_CREATED);
    res.send(board);
  });

  app.put('/:boardId', async (req: PutBoardRequest, res) => {
    const { boardId } = req.params;
    const board = await boardsService.update(boardId, req.body);
    if (board) {
      res.send(board);
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  app.delete<{ Params: boardParams }>('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.remove(boardId);
    if (board) {
      res.code(httpConstants.HTTP_STATUS_NO_CONTENT);
      res.send();
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });
};

export default boardsRouter;
