import path from 'path';
import fastify from 'fastify';
import fastswagger from 'fastify-swagger';
import usersRouter from './resources/users/user.router';
import boardsRouter from './resources/boards/board.router';
import tasksRouter from './resources/tasks/task.router';
import { bodyLogger, errorHandler, log } from './logger';

const app = fastify({
  logger: log,
});

app.register(bodyLogger);
app.register(errorHandler);

app.register(fastswagger, {
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
    baseDir: path.join(__dirname, '../doc/'),
  },
  exposeRoute: true,
  routePrefix: '/doc',
});

app.register(usersRouter, { prefix: '/users' });
app.register(boardsRouter, { prefix: '/boards' });
app.register(tasksRouter);

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

export default app;
