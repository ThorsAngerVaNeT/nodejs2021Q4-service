import tasksRepo from './task.typeorm.repository';
// import tasksRepo from './task.memory.repository';
import { Task } from './task.model';

/**
 * Returns all tasks at the board.
 * @param boardId - uuid of board
 * @returns array of all tasks at the board
 */
const getAll = (boardId: string): Promise<Task[]> => tasksRepo.getAll(boardId);

/**
 * Returns task by id.
 * @param boardId - uuid of board
 * @param taskId - uuid of task
 * @returns object of task or false if not found
 */
const getById = (
  boardId: string,
  taskId: string
): Promise<Task | false | undefined> => tasksRepo.getById(boardId, taskId);

/**
 * Creates task
 * @param task - object with title, order, description, userId, boardId, columnId fields
 * @returns object of new task
 */
const create = (task: Task): Promise<Task> => tasksRepo.create(task);

/**
 * Updates task by id.
 * @param id - uuid of task
 * @param task - object with title, order, description, userId, boardId, columnId fields
 * @returns object of updated task
 */
const update = (id: string, task: Task): Promise<Task | false | undefined> =>
  tasksRepo.update(id, task);

/**
 * Removes task by id
 * @param id - uuid of task
 * @returns true if task was found and deleted or false if not
 */
const remove = (id: string): Promise<boolean> => tasksRepo.remove(id);

/**
 * Unassigns user's tasks.
 * @param id - uuid of user
 * @returns Nothing
 */
// const unassignUser = (id: string): Promise<void> => tasksRepo.unassignUser(id);

export default { getAll, create, getById, update, remove };
