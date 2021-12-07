import path from 'path';
import { constants as httpConstants } from 'http2';
import { fastify, FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import inputValidation from 'openapi-validator-middleware';

const app = fastify({ logger: { prettyPrint: true } });

inputValidation.init(path.join(__dirname, '../doc/api.yaml'), {
  framework: 'fastify',
});

app.register(inputValidation.validate({}));

app.setErrorHandler(
  async (err: FastifyError, req: FastifyRequest, reply: FastifyReply) => {
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

app.register(require('fastify-swagger'), {
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
  exposeRoute: true,
  routePrefix: '/doc',
});

// app.register(require('./resources/users/user.router'), { prefix: '/users' });
// app.register(require('./resources/boards/board.router'), { prefix: '/boards' });
/* app.register(require('./resources/columns/column.router'), {
  prefix: '/columns',
}); */ // don't need for task4
// app.register(require('./resources/tasks/task.router'));

export = app;
