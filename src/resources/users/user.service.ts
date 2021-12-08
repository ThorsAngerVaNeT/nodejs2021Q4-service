import usersRepo from './user.memory.repository';
import { User } from './user.model';
// const tasksService = require('../tasks/task.memory.repository');
import tasksService from '../tasks/task.service';
// await tasksService.unassignUser(id);

const getAll = () => usersRepo.getAll();

const getById = (id: string) => usersRepo.getById(id);

const create = (user: User) => usersRepo.create(user);

const update = (id: string, user: User) => usersRepo.update(id, user);

const remove = (id: string) => {
  tasksService.unassignUser(id);
  return usersRepo.remove(id);
};

export default { getAll, create, getById, update, remove };
