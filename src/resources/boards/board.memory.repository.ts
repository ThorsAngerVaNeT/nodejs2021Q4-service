import { Board } from './board.model';
import { Columns as Column } from '../columns/column.model';

const boards: Board[] = [];

/**
 * Returns all boards from in-memory DB.
 *
 * @returns array of all boards
 */
const getAll = async (): Promise<Board[]> => boards;

/**
 * Returns board by id from in-memory DB.
 * @param id - uuid of board
 * @returns object of board or false if not found
 */
const getById = async (id: string): Promise<Board | false> => {
  const boardFound = boards.find((board) => board.id === id);
  if (!boardFound) {
    return false;
  }
  return boardFound;
};

/**
 * Creates board in in-memory DB
 * @param board - object with title and array of columns of title and order
 * @returns object of new board
 */
const create = async (board: Board): Promise<Board> => {
  boards.push(board);
  return board;
};

/**
 * Updates board by id in in-memory DB
 * @param id - uuid of board
 * @param board - object with title and array of columns of title and order
 * @returns object of updated board
 */
const update = async (id: string, boardData: Board): Promise<Board | false> => {
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

/**
 * Removes board by id from in-memory DB
 * @param id - uuid of board
 * @returns true if board was found or false if not
 */
const remove = async (id: string): Promise<boolean> => {
  const boardIndex = boards.findIndex((board) => board.id === id);
  if (boardIndex < 0) {
    return false;
  }
  boards.splice(boardIndex, 1);
  return true;
};

export default { getAll, create, getById, update, remove };
