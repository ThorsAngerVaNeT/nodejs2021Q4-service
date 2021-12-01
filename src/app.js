// const express = require('express');
const fastify = require('fastify');
// const swaggerUI = require('swagger-ui-express');
const path = require('path');
// const userRouter = require('./resources/users/user.router');

const app = fastify({ logger: { prettyPrint: true } });

app.register(require('fastify-swagger'), {
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
  exposeRoute: true,
  routePrefix: '/doc',
});

app.register(require('./resources/users/user.router'), { prefix: '/users' });
app.register(require('./resources/boards/board.router'), { prefix: '/boards' });
app.register(require('./resources/columns/column.router'), {
  prefix: '/columns',
});
app.register(require('./resources/tasks/task.router'));

module.exports = app;
