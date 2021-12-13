import { STATUS_CODES } from 'http';
import { constants as httpConstants } from 'http2';
import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import { User } from './user.model';
import usersService from './user.service';

interface userParams {
  userId: string;
}

type UserRequest = FastifyRequest<{
  Body: User;
}>;

type PutUserRequest = FastifyRequest<{
  Body: User;
  Params: userParams;
}>;

const usersRouter: FastifyPluginAsync = async (
  app: FastifyInstance
): Promise<void> => {
  app.get('/', async (_: FastifyRequest, res: FastifyReply) => {
    const users = await usersService.getAll();
    res.send(users.map(User.toResponse));
  });

  app.get(
    '/:userId',
    async (req: FastifyRequest<{ Params: userParams }>, res: FastifyReply) => {
      const { userId } = req.params;
      const user = await usersService.getById(userId);
      if (user) {
        res.send(user);
      } else {
        res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
        res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
      }
    }
  );

  app.post('/', async (req: UserRequest, res: FastifyReply) => {
    const user = new User(req.body);
    await usersService.create(user);
    res.code(httpConstants.HTTP_STATUS_CREATED);
    res.send(User.toResponse(user));
  });

  app.put('/:userId', async (req: PutUserRequest, res: FastifyReply) => {
    const { userId } = req.params;
    const user = await usersService.update(userId, req.body);
    if (user) {
      res.send(User.toResponse(user));
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  app.delete(
    '/:userId',
    async (req: FastifyRequest<{ Params: userParams }>, res: FastifyReply) => {
      const { userId } = req.params;
      const result = await usersService.remove(userId);
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

export default usersRouter;
