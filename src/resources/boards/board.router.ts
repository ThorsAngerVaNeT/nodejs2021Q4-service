import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import boardsHandlers from './board.handlers';

const boardsRouter: FastifyPluginAsync = async (
  app: FastifyInstance
): Promise<void> => {
  app.get('/', boardsHandlers.boardGet);

  app.get('/:boardId', boardsHandlers.boardGetById);

  app.post('/', boardsHandlers.boardPost);

  app.put('/:boardId', boardsHandlers.boardPut);

  app.delete('/:boardId', boardsHandlers.boardDelete);
};

export default boardsRouter;
