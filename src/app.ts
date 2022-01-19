import path from 'path';
import fastify from 'fastify';
import fastswagger from 'fastify-swagger';
import 'reflect-metadata';
import usersRouter from './resources/users/user.router';
import boardsRouter from './resources/boards/board.router';
import tasksRouter from './resources/tasks/task.router';
import loginRouter from './resources/login.router';
import { bodyLogger, errorHandler, log } from './logger';
import { auth } from './auth';

const app = fastify({
  logger: log,
});

app.register(bodyLogger);
app.register(errorHandler);
app.register(auth);

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
app.register(loginRouter);

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

export default app;
