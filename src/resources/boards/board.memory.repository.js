const tasksService = require('../tasks/task.memory.repository');

const boards = [];

const getAll = async () => boards;

const getById = async (id) => {
  const boardFound = boards.find((board) => board.id === id);
  if (!boardFound) {
    throw new Error(id);
  }
  return boardFound;
};

const create = async (board) => {
  boards.push(board);
  return board;
};

const update = async (id, boardData) => {
  const boardIndex = boards.findIndex((board) => board.id === id);
  if (boardIndex < 0) {
    return false;
  }
  boards[boardIndex] = {
    id,
    title: boardData.title,
    columns: boardData.columns,
  };
  return boards[boardIndex];
};

const remove = async (id) => {
  const boardIndex = boards.findIndex((board) => board.id === id);
  if (boardIndex < 0) {
    return false;
  }
  boards.splice(boardIndex, 1);
  await tasksService.removeByBoardId(id);
  return true;
};

module.exports = { getAll, create, getById, update, remove };
