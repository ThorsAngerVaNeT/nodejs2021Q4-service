import { FastifyInstance, FastifyPluginAsync } from 'fastify';

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
  app.post('/login', loginSchema, async (req, res) => {
    res.send('ok');
  });
};

export default loginRouter;
