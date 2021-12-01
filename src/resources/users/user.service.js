const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const create = (user) => usersRepo.create(user);

const update = (id, user) => usersRepo.update(id, user);

const remove = (id) => usersRepo.remove(id);

module.exports = { getAll, create, getById, update, remove };
