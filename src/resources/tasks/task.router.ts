import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import taskHandlers from './task.handlers';

const tasksRouter: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.get('/boards/:boardId/tasks', taskHandlers.taskGet);

  app.get('/boards/:boardId/tasks/:taskId', taskHandlers.taskGetById);

  app.post('/boards/:boardId/tasks', taskHandlers.taskPost);

  app.put('/boards/:boardId/tasks/:taskId', taskHandlers.taskPut);

  app.delete('/boards/:boardId/tasks/:taskId', taskHandlers.taskDelete);
};

export default tasksRouter;
