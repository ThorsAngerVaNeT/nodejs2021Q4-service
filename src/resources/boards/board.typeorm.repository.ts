import { getRepository } from 'typeorm';
import { Board } from './board.model';
import { Columns as Column } from '../columns/column.model';

/**
 * Returns all boards from in-memory DB.
 *
 * @returns array of all boards
 */
const getAll = async (): Promise<Board[]> => getRepository(Board).find();

/**
 * Returns board by id from in-memory DB.
 * @param id - uuid of board
 * @returns object of board or false if not found
 */
const getById = async (id: string): Promise<Board | undefined> =>
  getRepository(Board).findOne(id);

/**
 * Creates board in in-memory DB
 * @param board - object with title and array of columns of title and order
 * @returns object of new board
 */
const create = async (board: Board, columns: Column[]): Promise<Board> => {
  /* 
  const newColumns = await getRepository(Column).save(columns);
  const newBoard = await getRepository(Board).save({
    ...board,
    colums: newColumns,
  }); */
  const _board = board;
  _board.columns = await getRepository(Column).save(columns);
  const newBoard = await getRepository(Board).save(_board);

  return newBoard;
};

/**
 * Updates board by id in in-memory DB
 * @param id - uuid of board
 * @param board - object with title and array of columns of title and order
 * @returns object of updated board
 */
const update = async (
  id: string,
  boardData: Board
): Promise<Board | undefined> => {
  const columns = await getRepository(Column).save(boardData.columns);
  const board = await getRepository(Board).save({ id, title: boardData.title });
  return { ...board, columns };
};

/**
 * Removes board by id from in-memory DB
 * @param id - uuid of board
 * @returns true if board was found or false if not
 */
const remove = async (id: string): Promise<boolean> =>
  !!(await getRepository(Board).delete(id)).affected;

export default { getAll, create, getById, update, remove };
