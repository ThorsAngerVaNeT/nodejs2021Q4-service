import { Task } from './task.model';

let tasks: Task[] = [];

const getAll = async (boardId: string) => {
  const tasksFound = tasks.filter((task) => task.boardId === boardId);
  if (!tasksFound) {
    return false;
  }
  return tasksFound;
};

const getById = async (boardId: string, taskId: string) => {
  const taskFound = tasks.find(
    (task) => task.id === taskId && task.boardId === boardId
  );
  if (!taskFound) {
    return false;
  }
  return taskFound;
};

const create = async (task: Task) => {
  tasks.push(task);
  return task;
};

const update = async (id: string, taskData: Task) => {
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

const remove = async (id: string) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex < 0) {
    return false;
  }
  tasks.splice(taskIndex, 1);
  return true;
};

const removeByBoardId = async (boardId: string) => {
  const newTasks = tasks.filter((task) => task.boardId !== boardId);
  if (newTasks.length === tasks.length) {
    return false;
  }
  tasks = newTasks;
  return true;
};

const unassignUser = async (userId: string) => {
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
