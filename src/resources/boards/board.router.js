const { STATUS_CODES } = require('http');
const httpConstants = require('http2').constants;
const Board = require('./board.model');
const boardsService = require('./board.service');

module.exports = function (app, opts, done) {
  app.get('/', async (_, res) => {
    const boards = await boardsService.getAll();
    res.send(boards);
  });

  app.get('/:boardId', async (req, res) => {
    try {
      const id = req.params.boardId;
      console.log(req.params);
      const board = await boardsService.getById(id);
      res.send(board);
    } catch (error) {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(error.message);
    }
  });

  app.post('/', async (req, res) => {
    const board = new Board(req.body);
    await boardsService.create(board);
    res.code(httpConstants.HTTP_STATUS_CREATED);
    res.send(board);
  });

  app.put('/:boardId', async (req, res) => {
    const id = req.params.boardId;
    const board = await boardsService.update(id, req.body);
    if (board) {
      res.send(board);
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  app.delete('/:boardId', async (req, res) => {
    const id = req.params.boardId;
    const board = await boardsService.remove(id);
    if (board) {
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
const board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  // map board fields to exclude secret fields like "password"
  res.json(boards.map(board.toResponse));
});

module.exports = router;
 */
