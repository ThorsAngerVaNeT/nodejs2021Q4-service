let tasks = [];

const getAll = async (boardId) => {
  const tasksFound = tasks.filter((task) => task.boardId === boardId);
  if (!tasksFound) {
    throw new Error(boardId);
  }
  return tasksFound;
};

const getById = async (boardId, taskId) => {
  const taskFound = tasks.find(
    (task) => task.id === taskId && task.boardId === boardId
  );
  if (!taskFound) {
    throw new Error(taskId);
  }
  return taskFound;
};

const create = async (task) => {
  tasks.push(task);
  return task;
};

const update = async (id, taskData) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex < 0) {
    return false;
  }
  tasks[taskIndex] = {
    id,
    ...taskData,
  };
  return tasks[taskIndex];
};

const remove = async (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex < 0) {
    return false;
  }
  tasks.splice(taskIndex, 1);
  return true;
};

const removeByBoardId = async (boardId) => {
  const newTasks = tasks.filter((task) => task.boardId !== boardId);
  if (newTasks.length === tasks.length) {
    return false;
  }
  tasks = newTasks;
  return true;
};

const unassignUser = async (userId) => {
  tasks = tasks.map((el) => {
    const found = tasks.find((task) => task.userId === userId);
    if (found) {
      found.userId = null;
      update(found.id, found);
    }
    return el;
  });
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
  removeByBoardId,
  unassignUser,
};
