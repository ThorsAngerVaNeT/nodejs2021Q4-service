import { User } from './user.model';

const users: User[] = [];

const getAll = async () => users;

const getById = async (id: string) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex < 0) {
    return false;
  }
  return users[userIndex];
};

const create = async (user: User) => {
  users.push(user);
  const res = { id: user.id, name: user.name, user: user.login };
  return res;
};

const update = async (id: string, userData: User) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex < 0) {
    return false;
  }
  users[userIndex] = {
    ...users[userIndex],
    ...userData,
    id,
  };

  const res = {
    id: users[userIndex].id,
    name: users[userIndex].name,
    user: users[userIndex].login,
  };
  return res;
};

const remove = async (id: string) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex < 0) {
    return false;
  }
  users.splice(userIndex, 1);
  return true;
};

export default { getAll, create, getById, update, remove };
