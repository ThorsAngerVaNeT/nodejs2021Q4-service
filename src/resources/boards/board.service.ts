import boardsRepo from './board.memory.repository';
import tasksService from '../tasks/task.memory.repository';
import { Board } from './board.model';

const getAll = () => boardsRepo.getAll();

const getById = (id: string) => boardsRepo.getById(id);

const create = (board: Board) => boardsRepo.create(board);

const update = (id: string, board: Board) => boardsRepo.update(id, board);

const remove = (id: string) => {
  tasksService.removeByBoardId(id);
  return boardsRepo.remove(id);
};

export default { getAll, create, getById, update, remove };
