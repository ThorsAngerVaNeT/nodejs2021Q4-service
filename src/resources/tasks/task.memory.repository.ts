import { Task } from './task.model';

let tasks: Task[] = [];

/**
 * Returns all tasks at the board.
 * @param boardId - uuid of board
 * @returns array of all tasks at the board
 */
const getAll = async (boardId: string): Promise<Task[]> => {
  const tasksFound = tasks.filter((task) => task.boardId === boardId);
  /* if (!tasksFound) {
    return false;
  } */
  return tasksFound;
};

/**
 * Returns task by id.
 * @param boardId - uuid of board
 * @param taskId - uuid of task
 * @returns object of task or false if not found
 */
const getById = async (
  boardId: string,
  taskId: string
): Promise<Task | false> => {
  const taskFound = tasks.find(
    (task) => task.id === taskId && task.boardId === boardId
  );
  if (!taskFound) {
    return false;
  }
  return taskFound;
};

/**
 * Creates task
 * @param task - object with title, order, description, userId, boardId, columnId fields
 * @returns object of new task
 */
const create = async (task: Task): Promise<Task> => {
  tasks.push(task);
  return task;
};

/**
 * Updates task by id.
 * @param id - uuid of task
 * @param task - object with title, order, description, userId, boardId, columnId fields
 * @returns object of updated task
 */
const update = async (id: string, taskData: Task): Promise<Task | false> => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex < 0) {
    return false;
  }
  tasks[taskIndex] = {
    ...taskData,
    id,
  };
  return tasks[taskIndex];
};

/**
 * Removes task by id
 * @param id - uuid of task
 * @returns true if task was found and deleted or false if not
 */
const remove = async (id: string): Promise<boolean> => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex < 0) {
    return false;
  }
  tasks.splice(taskIndex, 1);
  return true;
};

/**
 * Removes all tasks at the board.
 * @param boardId - uuid of board
 * @returns true if tasks were found and deleted or false if not
 */
const removeByBoardId = async (boardId: string): Promise<boolean> => {
  const newTasks = tasks.filter((task) => task.boardId !== boardId);
  if (newTasks.length === tasks.length) {
    return false;
  }
  tasks = newTasks;
  return true;
};

/**
 * Unassigns user's tasks.
 * @param id - uuid of user
 * @returns Nothing
 */
const unassignUser = async (userId: string): Promise<void> => {
  tasks = tasks.map((el) => {
    const found = tasks.find((task) => task.userId === userId);
    if (found) {
      found.userId = null;
      update(found.id, found);
    }
    return el;
  });
};

export default {
  getAll,
  create,
  getById,
  update,
  remove,
  removeByBoardId,
  unassignUser,
};
