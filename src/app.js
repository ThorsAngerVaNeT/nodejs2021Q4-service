// const express = require('express');
const fastify = require('fastify');
// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const userRouter = require('./resources/users/user.router');

const app = fastify({ logger: true });

app.register(require('fastify-swagger'), {
  mode: 'static',
  specification: {
    path: './doc/api.yaml',
  },
  exposeRoute: true,
  routePrefix: '/doc',
});

module.exports = app;
