const { STATUS_CODES } = require('http');
const httpConstants = require('http2').constants;
const Column = require('./column.model');
const columnsService = require('./column.service');

module.exports = function (app, opts, done) {
  app.get('/', async (_, res) => {
    const columns = await columnsService.getAll();
    res.send(columns);
  });

  app.get('/:columnId', async (req, res) => {
    try {
      const id = req.params.columnId;
      const column = await columnsService.getById(id);
      res.send(column);
    } catch (error) {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(error.message);
    }
  });

  app.post('/', async (req, res) => {
    const column = new Column(req.body);
    await columnsService.create(column);
    res.code(httpConstants.HTTP_STATUS_CREATED);
    res.send(column);
  });

  app.put('/:columnId', async (req, res) => {
    const id = req.params.columnId;
    const column = await columnsService.update(id, req.body);
    if (column) {
      res.send(column);
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  app.delete('/:columnId', async (req, res) => {
    const id = req.params.columnId;
    const column = await columnsService.remove(id);
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

/* const router = require('express').Router();
const column = require('./column.model');
const columnsService = require('./column.service');

router.route('/').get(async (req, res) => {
  const columns = await columnsService.getAll();
  // map column fields to exclude secret fields like "password"
  res.json(columns.map(column.toResponse));
});

module.exports = router;
 */
