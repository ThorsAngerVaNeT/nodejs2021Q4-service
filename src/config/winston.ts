import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import config from './config';

export const winstonOptions: WinstonModuleOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike()
      ),
      level: config().LOG_LEVEL,
    }),
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike()
      ),
      filename: 'logs/logs.log',
      level: config().LOG_LEVEL,
    }),
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike()
      ),
      filename: 'logs/error.log',
      level: 'error',
    }),
  ],
};
