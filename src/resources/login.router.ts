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
        res.code(401).send('Bad login/password combination!');
      else if (user === null)
        res.code(403).send('Bad login/password combination!');
      else {
        const payload = { userId: user.id, login };
        const token = jwt.sign(payload, JWT_SECRET_KEY, {
          expiresIn: '120',
        });
        res.send(token);
      }
    }
  );
};

export default loginRouter;
