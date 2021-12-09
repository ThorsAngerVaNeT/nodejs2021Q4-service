import usersRepo from './user.memory.repository';
import { User } from './user.model';
import tasksService from '../tasks/task.service';

/**
 * Returns all users.
 *
 * @returns array of all users
 */
const getAll = (): Promise<User[]> => usersRepo.getAll();

/**
 * Returns user by id.
 * @param id - uuid of user
 * @returns object of user or false if not found
 */
const getById = (id: string): Promise<User | false> => usersRepo.getById(id);

/**
 * Creates user
 * @param user - object with name, login, password fields
 * @returns object of new user
 */
const create = (user: User): Promise<User> => usersRepo.create(user);

/**
 * Updates user by id.
 * @param id - uuid of user
 * @param user - object with name, login, password fields
 * @returns object of updated user
 */
const update = (id: string, user: User) => usersRepo.update(id, user);

/**
 * Removes user by id and unassign user's tasks.
 * @param id - uuid of user
 * @returns true if user was found or false if not
 */
const remove = (id: string) => {
  tasksService.unassignUser(id);
  return usersRepo.remove(id);
};

export default { getAll, create, getById, update, remove };
