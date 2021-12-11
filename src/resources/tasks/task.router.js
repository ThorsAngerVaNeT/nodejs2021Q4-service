const { STATUS_CODES } = require('http');
const httpConstants = require('http2').constants;
const Task = require('./task.model');
const tasksService = require('./task.service');

module.exports = function tasksRouter(app, opts, done) {
  app.get('/boards/:boardId/tasks', async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);
    res.send(tasks);
  });

  app.get('/boards/:boardId/tasks/:taskId', async (req, res) => {
    const { taskId, boardId } = req.params;
    const task = await tasksService.getById(boardId, taskId);
    if (task) {
      res.send(task);
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  app.post('/boards/:boardId/tasks', async (req, res) => {
    req.body.boardId = req.params.boardId;
    const task = new Task(req.body);
    await tasksService.create(task);
    res.code(httpConstants.HTTP_STATUS_CREATED);
    res.send(task);
  });

  app.put('/boards/:boardId/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const task = await tasksService.update(taskId, req.body);
    if (task) {
      res.send(task);
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  app.delete('/boards/:boardId/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const task = await tasksService.remove(taskId);
    if (task) {
      res.code(httpConstants.HTTP_STATUS_NO_CONTENT);
      res.send();
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  done();
};
