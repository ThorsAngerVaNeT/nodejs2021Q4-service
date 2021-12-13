import { STATUS_CODES } from 'http';
import { constants as httpConstants } from 'http2';
import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import { Task } from './task.model';
import tasksService from './task.service';

interface taskParams {
  boardId: string;
  taskId: string;
}

type PostTaskRequest = FastifyRequest<{
  Body: Task;
  Params: {
    boardId: string;
  };
}>;

type PutTaskRequest = FastifyRequest<{
  Body: Task;
  Params: taskParams;
}>;

const tasksRouter: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.get(
    '/boards/:boardId/tasks',
    async (req: FastifyRequest<{ Params: taskParams }>, res: FastifyReply) => {
      const { boardId } = req.params;
      const tasks = await tasksService.getAll(boardId);
      res.send(tasks);
    }
  );

  app.get(
    '/boards/:boardId/tasks/:taskId',
    async (req: FastifyRequest<{ Params: taskParams }>, res: FastifyReply) => {
      const { taskId, boardId } = req.params;
      const task = await tasksService.getById(boardId, taskId);
      if (task) {
        res.send(task);
      } else {
        res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
        res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
      }
    }
  );

  app.post(
    '/boards/:boardId/tasks',
    async (req: PostTaskRequest, res: FastifyReply) => {
      const { id, title, order, description, userId, boardId, columnId } =
        req.body;
      const task = new Task(
        id,
        title,
        order,
        description,
        userId,
        boardId,
        columnId
      );
      await tasksService.create(task);
      res.code(httpConstants.HTTP_STATUS_CREATED);
      res.send(task);
    }
  );

  app.put(
    '/boards/:boardId/tasks/:taskId',
    async (req: PutTaskRequest, res: FastifyReply) => {
      const { taskId } = req.params;
      const task = await tasksService.update(taskId, req.body);
      if (task) {
        res.send(task);
      } else {
        res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
        res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
      }
    }
  );

  app.delete(
    '/boards/:boardId/tasks/:taskId',
    async (req: FastifyRequest<{ Params: taskParams }>, res: FastifyReply) => {
      const { taskId } = req.params;
      const result = await tasksService.remove(taskId);
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

export default tasksRouter;
