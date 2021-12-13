import { STATUS_CODES } from 'http';
import { constants as httpConstants } from 'http2';
import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import { Board } from './board.model';
import boardsService from './board.service';

interface boardParams {
  boardId: string;
}

type BoardRequest = FastifyRequest<{
  Body: Board;
}>;

type PutBoardRequest = FastifyRequest<{
  Body: Board;
  Params: boardParams;
}>;

const boardsRouter: FastifyPluginAsync = async (
  app: FastifyInstance
): Promise<void> => {
  app.get('/', async (_: FastifyRequest, res: FastifyReply) => {
    const boards = await boardsService.getAll();
    res.send(boards);
  });

  app.get(
    '/:boardId',
    async (req: FastifyRequest<{ Params: boardParams }>, res: FastifyReply) => {
      const { boardId } = req.params;
      const board = await boardsService.getById(boardId);
      if (board) {
        res.send(board);
      } else {
        res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
        res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
      }
    }
  );

  app.post('/', async (req: BoardRequest, res: FastifyReply) => {
    const board = new Board(req.body);
    await boardsService.create(board);
    res.code(httpConstants.HTTP_STATUS_CREATED);
    res.send(board);
  });

  app.put('/:boardId', async (req: PutBoardRequest, res: FastifyReply) => {
    const { boardId } = req.params;
    const board = await boardsService.update(boardId, req.body);
    if (board) {
      res.send(board);
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  app.delete(
    '/:boardId',
    async (req: FastifyRequest<{ Params: boardParams }>, res: FastifyReply) => {
      const { boardId } = req.params;
      const result = await boardsService.remove(boardId);
      if (result) {
        res.code(httpConstants.HTTP_STATUS_NO_CONTENT);
        res.send();
      } else {
        res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
        res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
      }
    }
  );
};

export default boardsRouter;
