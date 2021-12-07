import { 
  FastifyInstance, 
  FastifyPluginOptions, 
  FastifyPluginAsync 
} from 'fastify';
import fp from 'fastify-plugin';

const { STATUS_CODES } = require('http');
const httpConstants = require('http2').constants;
const User = require('./user.model');
const usersService = require('./user.service');

interface userParams {
  userId: string;
}

const usersRouter: FastifyPluginAsync = async(app: FastifyInstance, opts:FastifyPluginOptions) => {
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

  app.post('/', async (req, res) => {
    const user = new User(req.body);
    await usersService.create(user);
    res.code(httpConstants.HTTP_STATUS_CREATED);
    res.send(user);
  });

  app.put<{ Params: userParams }>('/:userId', async (req, res) => {
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
module.exports = fp(usersRouter);