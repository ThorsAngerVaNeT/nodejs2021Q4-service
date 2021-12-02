const fastify = require('fastify');
const path = require('path');

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
/* app.register(require('./resources/columns/column.router'), {
  prefix: '/columns',
}); */ // don't need for task4
app.register(require('./resources/tasks/task.router'));

module.exports = app;
