import { getRepository } from 'typeorm';
import { Task } from './task.model';

/**
 * Returns all tasks at the board from in-memory DB.
 * @param boardId - uuid of board
 * @returns array of all tasks at the board
 */
const getAll = async (boardId: string): Promise<Task[]> =>
  getRepository(Task).find({ boardId });

/**
 * Returns task by id from in-memory DB.
 * @param boardId - uuid of board
 * @param taskId - uuid of task
 * @returns object of task or false if not found
 */
const getById = async (
  boardId: string,
  taskId: string
): Promise<Task | undefined> =>
  getRepository(Task).findOne({ boardId, id: taskId });

/**
 * Creates task in in-memory DB
 * @param task - object with title, order, description, userId, boardId, columnId fields
 * @returns object of new task
 */
const create = async (task: Task): Promise<Task> =>
  getRepository(Task).save(task);

/**
 * Updates task by id in in-memory DB.
 * @param id - uuid of task
 * @param task - object with title, order, description, userId, boardId, columnId fields
 * @returns object of updated task
 */
const update = async (id: string, taskData: Task): Promise<Task | undefined> =>
  getRepository(Task).save({ ...taskData, id });

/**
 * Removes task by id from in-memory DB
 * @param id - uuid of task
 * @returns true if task was found and deleted or false if not
 */
const remove = async (id: string): Promise<boolean> =>
  !!(await getRepository(Task).delete(id)).affected;

/**
 * Removes all tasks at the board from in-memory DB.
 * @param boardId - uuid of board
 * @returns true if tasks were found and deleted or false if not
 */
const removeByBoardId = async (boardId: string): Promise<boolean> =>
  !!(await getRepository(Task).delete(boardId)).affected;

export default {
  getAll,
  create,
  getById,
  update,
  remove,
  removeByBoardId,
};
