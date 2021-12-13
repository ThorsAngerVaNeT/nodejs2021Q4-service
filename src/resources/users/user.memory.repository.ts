import { User } from './user.model';

const users: User[] = [];

/**
 * Returns all users.
 *
 * @returns array of all users
 */
const getAll = async (): Promise<User[]> => users;

/**
 * Returns user by id.
 * @param id - uuid of user
 * @returns object of user or false if not found
 */
const getById = async (id: string): Promise<User | false> => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex < 0) {
    return false;
  }
  const user = users[userIndex];
  return user;
};

/**
 * Creates user
 * @param user - object with name, login, password fields
 * @returns object of new user
 */
const create = async (user: User): Promise<User> => {
  users.push(user);
  // const res = user;
  return user;
};

/**
 * Updates user by id.
 * @param id - uuid of user
 * @param user - object with name, login, password fields
 * @returns object of updated user
 */
const update = async (id: string, userData: User): Promise<User | false> => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex < 0) {
    return false;
  }
  users[userIndex] = {
    ...users[userIndex],
    ...userData,
    id,
  };

  const user = users[userIndex];
  return user;
};

/**
 * Removes user by id
 * @param id - uuid of user
 * @returns true if user was found and deleted or false if not
 */
const remove = async (id: string): Promise<boolean> => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex < 0) {
    return false;
  }
  users.splice(userIndex, 1);
  return true;
};

export default { getAll, create, getById, update, remove };
