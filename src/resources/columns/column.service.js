const columnsRepo = require('./column.memory.repository');

const getAll = () => columnsRepo.getAll();

const getById = (id) => columnsRepo.getById(id);

const create = (column) => columnsRepo.create(column);

const update = (id, column) => columnsRepo.update(id, column);

const remove = (id) => columnsRepo.remove(id);

module.exports = { getAll, create, getById, update, remove };
