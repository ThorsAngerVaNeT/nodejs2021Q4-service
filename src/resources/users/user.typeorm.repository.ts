import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from './user.model';
import { SALT_ROUNDS } from '../../common/config';

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
const create = async (user: User): Promise<User> => {
  const _user = user;
  _user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  return getRepository(User).save(_user);
};

/**
 * Updates user by id in Postgres DB
 * @param id - uuid of user
 * @param user - object with name, login, password fields
 * @returns object of updated user
 */
const update = async (
  id: string,
  userData: User
): Promise<User | undefined> => {
  const _user = userData;
  _user.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
  return getRepository(User).save({ ...userData, id });
};

/**
 * Removes user by id from Postgres DB
 * @param id - uuid of user
 * @returns true if user was found and deleted or false if not
 */
const remove = async (id: string): Promise<boolean> =>
  !!(await getRepository(User).delete(id)).affected;

/**
 *
 * @param login - user's login
 * @param password - user's hash password
 * @returns
 */
const auth = async (
  login: string,
  password: string
): Promise<User | undefined | null> => {
  const user = await getRepository(User).findOne({ login });
  if (!user) {
    return null;
  }
  const isPwdCorrect = await bcrypt.compare(password, user.password);

  if (isPwdCorrect) return user;
  return undefined;
};

export default { getAll, create, getById, update, remove, auth };
