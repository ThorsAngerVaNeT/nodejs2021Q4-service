const { STATUS_CODES } = require('http');
const httpConstants = require('http2').constants;
const Board = require('./board.model');
const boardsService = require('./board.service');

module.exports = function boardsRouter(app, opts, done) {
  app.get('/', async (_, res) => {
    const boards = await boardsService.getAll();
    res.send(boards);
  });

  app.get('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.getById(boardId);
    if (board) {
      res.send(board);
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  app.post('/', async (req, res) => {
    const board = new Board(req.body);
    await boardsService.create(board);
    res.code(httpConstants.HTTP_STATUS_CREATED);
    res.send(board);
  });

  app.put('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.update(boardId, req.body);
    if (board) {
      res.send(board);
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  app.delete('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.remove(boardId);
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
