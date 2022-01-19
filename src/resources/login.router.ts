import { constants as httpConstants } from 'http2';
import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import usersService from './users/user.service';

const loginSchema = {
  schema: {
    body: {
      type: 'object',
      properties: { login: { type: 'string' }, password: { type: 'string' } },
      required: ['login', 'password'],
    },
  },
};

const loginRouter: FastifyPluginAsync = async (
  app: FastifyInstance
): Promise<void> => {
  app.post(
    '/login',
    loginSchema,
    async (
      req: FastifyRequest<{
        Body: { login: string; password: string };
      }>,
      res
    ) => {
      const { login, password } = req.body;
      const user = await usersService.auth(login, password);
      if (user === undefined)
        res
          .code(httpConstants.HTTP_STATUS_UNAUTHORIZED)
          .send('Bad login/password combination!');
      else if (user === null)
        res
          .code(httpConstants.HTTP_STATUS_FORBIDDEN)
          .send('Bad login/password combination!');
      else {
        const payload = { userId: user.id, login };
        const token = jwt.sign(payload, JWT_SECRET_KEY, {
          expiresIn: '900s',
        });
        res.send({ token });
      }
    }
  );
};

export default loginRouter;
