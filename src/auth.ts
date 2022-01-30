import { constants as httpConstants } from 'http2';
import jwt from 'jsonwebtoken';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { JWT_SECRET_KEY } from './common/config';

const allowedUrls = ['/login', '/doc', '/'];

export const auth: FastifyPluginAsync = fp(
  async (app: FastifyInstance): Promise<void> => {
    app.addHook('preValidation', (req, res, done) => {
      if (allowedUrls.includes(req.url) || req.is404) return done();
      try {
        if (req.headers.authorization) {
          const [authType, token] = req.headers.authorization.split(' ');
          if (authType === 'Bearer' && !!token) {
            jwt.verify(token, JWT_SECRET_KEY);
            return done();
          }
          return res
            .status(httpConstants.HTTP_STATUS_UNAUTHORIZED)
            .send('Invalid authorization type or missing token');
        }
        return res
          .status(httpConstants.HTTP_STATUS_UNAUTHORIZED)
          .send('Authorization required');
      } catch (error) {
        return res.status(httpConstants.HTTP_STATUS_UNAUTHORIZED).send(error);
      }
    });
  }
);
