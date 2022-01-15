import {
  FastifyInstance,
  FastifyPluginAsync,
} from 'fastify';
import usersHandlers from './user.handlers';

const usersRouter: FastifyPluginAsync = async (
  app: FastifyInstance
): Promise<void> => {
  app.get('/', usersHandlers.userGet);

  app.get('/:userId', usersHandlers.userGetById);

  app.post('/', usersHandlers.userPost);

  app.put('/:userId', usersHandlers.userPut);

  app.delete('/:userId', usersHandlers.userDelete);
};

export default usersRouter;
