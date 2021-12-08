import { STATUS_CODES } from 'http';
import { constants as httpConstants } from 'http2';
import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';
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
  app.get('/', async (_, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.send(users.map(User.toResponse));
  });

  app.get<{ Params: userParams }>('/:userId', async (req, res) => {
    const { userId } = req.params;
    const user = await usersService.getById(userId);
    if (user) {
      res.send(user);
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  /* remove password by schema or by create */
  app.post(
    '/',
    {
      schema: {
        response: {
          201: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                formta: 'uuid',
              },
              name: {
                type: 'string',
              },
              login: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    async (req: UserRequest, res) => {
      const user = new User(req.body);
      await usersService.create(user);
      res.code(httpConstants.HTTP_STATUS_CREATED);
      res.send(user);
    }
  );

  app.put('/:userId', async (req: PutUserRequest, res) => {
    const { userId } = req.params;
    const user = await usersService.update(userId, req.body);
    if (user) {
      res.send(user);
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  app.delete<{ Params: userParams }>('/:userId', async (req, res) => {
    const { userId } = req.params;
    const user = await usersService.remove(userId);
    if (user) {
      res.code(httpConstants.HTTP_STATUS_NO_CONTENT);
      res.send();
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });
};

export default usersRouter;
