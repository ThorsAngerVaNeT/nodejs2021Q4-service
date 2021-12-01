const tasksService = require('../tasks/task.memory.repository');

const users = [];

const getAll = async () => users;

const getById = async (id) => {
  const userIndex = users.findIndex((user) => user.id === id);
  console.log(userIndex);
  if (userIndex < 0) {
    throw new Error(`User with id=${id} not found!`);
  }
  return users[userIndex];
};

const create = async (user) => {
  users.push(user);
  const res = user;
  return delete res.password;
};

const update = async (id, userData) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex < 0) {
    return false;
  }
  users[userIndex] = {
    id,
    name: userData.name,
    login: userData.login,
    password: userData.password,
  };
  return users[userIndex];
};

const remove = async (id) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex < 0) {
    return false;
  }
  users.splice(userIndex, 1);
  await tasksService.unassignUser(id);
  return true;
};

module.exports = { getAll, create, getById, update, remove };
