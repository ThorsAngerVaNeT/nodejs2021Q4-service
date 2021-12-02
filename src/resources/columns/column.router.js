const { STATUS_CODES } = require('http');
const httpConstants = require('http2').constants;
const Column = require('./column.model');
const columnsService = require('./column.service');

module.exports = function columnsRouter(app, opts, done) {
  app.get('/', async (_, res) => {
    const columns = await columnsService.getAll();
    res.send(columns);
  });

  app.get('/:columnId', async (req, res) => {
    const { columnId } = req.params;
    const column = await columnsService.getById(columnId);
    if (column) {
      res.send(column);
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  app.post('/', async (req, res) => {
    const column = new Column(req.body);
    await columnsService.create(column);
    res.code(httpConstants.HTTP_STATUS_CREATED);
    res.send(column);
  });

  app.put('/:columnId', async (req, res) => {
    const { columnId } = req.params;
    const column = await columnsService.update(columnId, req.body);
    if (column) {
      res.send(column);
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  app.delete('/:columnId', async (req, res) => {
    const { columnId } = req.params;
    const column = await columnsService.remove(columnId);
    if (column) {
      res.code(httpConstants.HTTP_STATUS_NO_CONTENT);
      res.send();
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  done();
};
