import { STATUS_CODES } from 'http';
import { constants as httpConstants } from 'http2';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { Task, TaskInterface } from './task.model';
import tasksService from './task.service';

interface taskParams {
  boardId: string;
  taskId: string;
}

type PostTaskRequest = FastifyRequest<{
  Body: TaskInterface;
  Params: {
    boardId: string;
  };
}>;

type PutTaskRequest = FastifyRequest<{
  Body: TaskInterface;
  Params: taskParams;
}>;

const tasksRouter = async (app: FastifyInstance) => {
  app.get<{ Params: taskParams }>(
    '/boards/:boardId/tasks',
    async (req, res) => {
      const { boardId } = req.params;
      const tasks = await tasksService.getAll(boardId);
      res.send(tasks);
    }
  );

  app.get<{ Params: taskParams }>(
    '/boards/:boardId/tasks/:taskId',
    async (req, res) => {
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

  app.post('/boards/:boardId/tasks', async (req: PostTaskRequest, res) => {
    req.body.boardId = req.params.boardId;
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
  });

  app.put(
    '/boards/:boardId/tasks/:taskId',
    async (req: PutTaskRequest, res) => {
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

  app.delete<{ Params: taskParams }>(
    '/boards/:boardId/tasks/:taskId',
    async (req, res) => {
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
