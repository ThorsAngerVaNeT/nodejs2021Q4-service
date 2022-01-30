import { getRepository } from 'typeorm';
import { User } from './user.model';

/**
 * Returns all users from Postgres DB.
 *
 * @returns array of all users
 */
const getAll = async (): Promise<User[]> => getRepository(User).find();

/**
 * Returns user by id from Postgres DB.
 * @param id - uuid of user
 * @returns object of user or false if not found
 */
const getById = async (id: string): Promise<User | undefined> =>
  getRepository(User).findOne(id);
/**
 * Creates user in Postgres DB
 * @param user - object with name, login, password fields
 * @returns object of new user
 */
const create = async (user: User): Promise<User> =>
  getRepository(User).save(user);

/**
 * Updates user by id in Postgres DB
 * @param id - uuid of user
 * @param user - object with name, login, password fields
 * @returns object of updated user
 */
const update = async (id: string, userData: User): Promise<User | undefined> =>
  getRepository(User).save({ ...userData, id });

/**
 * Removes user by id from Postgres DB
 * @param id - uuid of user
 * @returns true if user was found and deleted or false if not
 */
const remove = async (id: string): Promise<boolean> =>
  !!(await getRepository(User).delete(id)).affected;

export default { getAll, create, getById, update, remove };
