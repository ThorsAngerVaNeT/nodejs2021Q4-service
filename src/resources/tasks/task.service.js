const tasksRepo = require('./task.memory.repository');

const getAll = (boardId) => tasksRepo.getAll(boardId);

const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const create = (task) => tasksRepo.create(task);

const update = (id, task) => tasksRepo.update(id, task);

const remove = (id) => tasksRepo.remove(id);

module.exports = { getAll, create, getById, update, remove };
