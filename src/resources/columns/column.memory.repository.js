const columns = [];

const getAll = async () => columns;

const getById = async (id) => {
  const columnFound = columns.find((column) => column.id === id);
  if (!columnFound) {
    throw new Error(id);
  }
  return columnFound;
};

const create = async (column) => {
  columns.push(column);
  return column;
};

const update = async (id, columnData) => {
  const columnIndex = columns.findIndex((column) => column.id === id);
  if (columnIndex < 0) {
    return false;
  }
  columns[columnIndex] = {
    id,
    title: columnData.title,
    order: columnData.order,
  };
  return columns[columnIndex];
};

const remove = async (id) => {
  const columnIndex = columns.findIndex((column) => column.id === id);
  if (columnIndex < 0) {
    return false;
  }
  columns.splice(columnIndex, 1);
  return true;
};

module.exports = { getAll, create, getById, update, remove };
