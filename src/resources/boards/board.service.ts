import boardsRepo from './board.typeorm.repository';
// import boardsRepo from './board.memory.repository';
import tasksService from '../tasks/task.memory.repository';
import { Board } from './board.model';
import { Columns as Column } from '../columns/column.model';

/**
 * Returns all boards.
 *
 * @returns array of all boards
 */
const getAll = (): Promise<Board[]> => boardsRepo.getAll();

/**
 * Returns board by id.
 * @param id - uuid of board
 * @returns object of board or false if not found
 */
const getById = (id: string): Promise<Board | false | undefined> =>
  boardsRepo.getById(id);

/**
 * Creates board
 * @param board - object with title and array of columns of title and order
 * @returns object of new board
 */
const create = (board: Board, columns: Column[]): Promise<Board> =>
  boardsRepo.create(board, columns);

/**
 * Updates board by id.
 * @param id - uuid of board
 * @param board - object with title and array of columns of title and order
 * @returns object of updated board
 */
const update = (id: string, board: Board): Promise<Board | false | undefined> =>
  boardsRepo.update(id, board);

/**
 * Removes board by id and remove all tasks at this board.
 * @param id - uuid of board
 * @returns true if board was found or false if not
 */
const remove = (id: string): Promise<boolean> => {
  tasksService.removeByBoardId(id);
  return boardsRepo.remove(id);
};

export default { getAll, create, getById, update, remove };
