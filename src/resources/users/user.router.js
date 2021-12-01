const { STATUS_CODES } = require('http');
const httpConstants = require('http2').constants;
const User = require('./user.model');
const usersService = require('./user.service');

module.exports = function (app, opts, done) {
  app.get('/', async (_, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.send(users.map(User.toResponse));
  });

  app.get('/:userId', async (req, res) => {
    try {
      const id = req.params.userId;
      const user = await usersService.getById(id);
      res.send(user);
    } catch (error) {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(error.message);
    }
  });

  app.post('/', async (req, res) => {
    const user = new User(req.body);
    await usersService.create(user);
    res.code(httpConstants.HTTP_STATUS_CREATED);
    res.send(user);
  });

  app.put('/:userId', async (req, res) => {
    const id = req.params.userId;
    const user = await usersService.update(id, req.body);
    if (user) {
      res.send(user);
    } else {
      res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
      res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
    }
  });

  app.delete('/:userId', async (req, res) => {
    const id = req.params.userId;
    const user = await usersService.remove(id);
    if (user) {
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
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

module.exports = router;
 */
