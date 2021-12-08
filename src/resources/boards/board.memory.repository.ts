import { Board } from './board.model';
import { Column } from '../columns/column.model';

const boards: Board[] = [];

const getAll = async () => boards;

const getById = async (id: string) => {
  const boardFound = boards.find((board) => board.id === id);
  if (!boardFound) {
    return false;
  }
  return boardFound;
};

const create = async (board: Board) => {
  boards.push(board);
  return board;
};

const update = async (id: string, boardData: Board) => {
  const boardIndex = boards.findIndex((board) => board.id === id);
  if (boardIndex < 0) {
    return false;
  }
  boards[boardIndex] = {
    id,
    title: boardData.title,
    columns: boardData.columns.map((el: Column) => new Column(el)),
  };
  return boards[boardIndex];
};

const remove = async (id: string) => {
  const boardIndex = boards.findIndex((board) => board.id === id);
  if (boardIndex < 0) {
    return false;
  }
  boards.splice(boardIndex, 1);
  return true;
};

export default { getAll, create, getById, update, remove };
