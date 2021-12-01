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
    try {
      const { taskId } = req.params;
      const { boardId } = req.params;
      const task = await tasksService.getById(boardId, taskId);
      res.send(task);
    } catch (error) {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(error.message);
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
    const id = req.params.taskId;
    const task = await tasksService.update(id, req.body);
    if (task) {
      res.send(task);
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  app.delete('/boards/:boardId/tasks/:taskId', async (req, res) => {
    const id = req.params.taskId;
    const task = await tasksService.remove(id);
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

/* const router = require('express').Router();
const task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  // map task fields to exclude secret fields like "password"
  res.json(tasks.map(task.toResponse));
});

module.exports = router;
 */
