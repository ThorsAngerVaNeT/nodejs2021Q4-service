import { STATUS_CODES } from 'http';
import { constants as httpConstants } from 'http2';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Task } from './task.model';
import tasksService from './task.service';

interface taskParams {
  boardId: string;
  taskId: string;
}

type PostTaskRequest = FastifyRequest<{
  Body: Omit<Task, 'id'>;
  Params: {
    boardId: string;
  };
}>;

type PutTaskRequest = FastifyRequest<{
  Body: Task;
  Params: taskParams;
}>;

/**
 * Handles incoming request to get all tasks
 * @param _ - incoming request object, not using
 * @param res - response object
 */
const taskGet = async (
  req: FastifyRequest<{ Params: taskParams }>,
  res: FastifyReply
): Promise<void> => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAll(boardId);
  res.send(tasks);
};

/**
 * Handles incoming request to get task by id
 * @param req - incoming request object
 * @param res - response object
 */
const taskGetById = async (
  req: FastifyRequest<{ Params: taskParams }>,
  res: FastifyReply
): Promise<void> => {
  const { taskId, boardId } = req.params;
  const task = await tasksService.getById(boardId, taskId);
  if (task) {
    res.send(task);
  } else {
    res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
    res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
  }
};

/**
 * Handles incoming request to create new task
 * @param req - incoming request object
 * @param res - response object
 */
const taskPost = async (
  req: PostTaskRequest,
  res: FastifyReply
): Promise<void> => {
  req.body.boardId = req.params.boardId;
  const task = new Task(req.body);
  await tasksService.create(task);
  res.code(httpConstants.HTTP_STATUS_CREATED);
  res.send(task);
};

/**
 * Handles incoming request to update task
 * @param req - incoming request object
 * @param res - response object
 */
const taskPut = async (
  req: PutTaskRequest,
  res: FastifyReply
): Promise<void> => {
  const { taskId } = req.params;
  const task = await tasksService.update(taskId, req.body);
  if (task) {
    res.send(task);
  } else {
    res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
    res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
  }
};

/**
 * Handles incoming request to delete task
 * @param req - incoming request object
 * @param res - response object
 */
const taskDelete = async (
  req: FastifyRequest<{ Params: taskParams }>,
  res: FastifyReply
): Promise<void> => {
  const { taskId } = req.params;
  const result = await tasksService.remove(taskId);
  if (result) {
    res.code(httpConstants.HTTP_STATUS_NO_CONTENT);
    res.send();
  } else {
    res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
    res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
  }
};

export default { taskGet, taskGetById, taskPost, taskPut, taskDelete };
