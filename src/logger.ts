import pino from 'pino';
import path from 'path';
import { constants as httpConstants } from 'http2';
import {
  FastifyError,
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
  FastifyPluginAsync,
} from 'fastify';
import inputValidation from 'openapi-validator-middleware';
import fp from 'fastify-plugin';
import { LOG_LEVEL } from './common/config';

export const log = pino({
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: {
          destination: 'logs/error.log',
          mkdir: true,
          translateTime: 'HH:MM:ss.Z',
        },
        level: 'error',
      },
      {
        target: 'pino-pretty',
        options: {
          destination: 'logs/logs.log',
          mkdir: true,
          translateTime: 'HH:MM:ss.Z',
        },
        level: LOG_LEVEL,
      },
      {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss.Z',
        },
        level: LOG_LEVEL,
      },
    ],
  },
  serializers: {
    req(request) {
      return {
        url: request.url,
        queryParams: request.params,
        queryString: request.query,
      };
    },
  },
});

process.on('uncaughtException', (error) => {
  log.error(error, 'captured uncaughtException');
  setTimeout(() => {
    process.exit(1);
  }, 500);
});

process.on('unhandledRejection', (reason) => {
  log.error(reason, 'Unhandled rejection detected');
  process.exit(1);
});

export const bodyLogger: FastifyPluginAsync = fp(
  async (app: FastifyInstance): Promise<void> => {
    app.addHook('preValidation', (req, reply, done) => {
      if (req.body) {
        log.info({ body: req.body }, 'parsed body');
      }
      done();
    });
  }
);

export const errorHandler: FastifyPluginAsync = fp(
  async (app: FastifyInstance): Promise<void> => {
    inputValidation.init(path.join(__dirname, '../doc/api.yaml'), {
      framework: 'fastify',
    });

    app.register(inputValidation.validate({}));

    // centralized errorHandler
    app.setErrorHandler(
      async (err: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
        log.error(err);
        if (err instanceof inputValidation.InputValidationError) {
          return reply
            .status(httpConstants.HTTP_STATUS_BAD_REQUEST)
            .send({ message: err.message, errors: err.errors });
        }

        return reply
          .status(
            err.statusCode || httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR
          )
          .send(err);
      }
    );
  }
);
