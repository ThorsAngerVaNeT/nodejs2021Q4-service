import path from 'path';
import { constants as httpConstants } from 'http2';
import fastify, { FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import inputValidation from 'openapi-validator-middleware';
import fastswagger from 'fastify-swagger';
// import usersRouter from './resources/users/user.router';
// import boardsRouter from './resources/boards/board.router';
// import tasksRouter from './resources/tasks/task.router';

const app = fastify({ logger: { prettyPrint: true, level: 'debug' } });

inputValidation.init(path.join(__dirname, '../doc/api.yaml'), {
  framework: 'fastify',
});

app.register(inputValidation.validate({}));

app.setErrorHandler(
  async (err: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
    if (err instanceof inputValidation.InputValidationError) {
      return reply
        .status(httpConstants.HTTP_STATUS_BAD_REQUEST)
        .send({ more_info: err.message });
    }

    return reply
      .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
);

app.register(fastswagger, {
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
    baseDir: path.join(__dirname, '../doc/'),
  },
  exposeRoute: true,
  routePrefix: '/doc',
});

// app.register(usersRouter, { prefix: '/users' });
// app.register(boardsRouter, { prefix: '/boards' });
/* app.register(require('./resources/columns/column.router'), {
  prefix: '/columns',
}); */ // don't need for task4
// app.register(tasksRouter);

export = app;
