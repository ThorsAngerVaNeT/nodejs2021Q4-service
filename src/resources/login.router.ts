import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';
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
      const auth = await usersService.auth(login, password);
      if (auth === undefined)
        res.code(401).send('Bad login/password combination!');
      else res.send(auth); // TODO generate JWT
    }
  );
};

export default loginRouter;
