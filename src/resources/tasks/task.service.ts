import tasksRepo from './task.memory.repository';
import { Task } from './task.model';

const getAll = (boardId: string) => tasksRepo.getAll(boardId);

const getById = (boardId: string, taskId: string) =>
  tasksRepo.getById(boardId, taskId);

const create = (task: Task) => tasksRepo.create(task);

const update = (id: string, task: Task) => tasksRepo.update(id, task);

const remove = (id: string) => tasksRepo.remove(id);

const unassignUser = (id: string) => tasksRepo.unassignUser(id);

export default { getAll, create, getById, update, remove, unassignUser };
