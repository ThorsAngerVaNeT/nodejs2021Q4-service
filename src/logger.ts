import fs from 'fs';
import pino from 'pino';
import { LOG_LEVEL } from './common/config';

const transport = pino.transport({
  targets: [
    {
      target: 'pino/file',
      options: { destination: 'logs/error.log', mkdir: true },
      level: 'error',
    },
    {
      target: 'pino/file',
      options: { destination: 'logs/logs.log', mkdir: true },
      level: LOG_LEVEL,
    },
  ],
});

const log = pino(transport);

process.on('uncaughtException', (error, origin) => {
  fs.writeFileSync(
    './logs/error.log',
    `captured error: ${error.message} from ${origin}\n`,
    {
      flag: 'a+',
    }
  );
});

process.on('unhandledRejection', (reason) => {
  fs.writeFileSync(
    './logs/error.log',
    `Unhandled rejection detected: ${reason}\n`,
    {
      flag: 'a+',
    }
  );
});

export default log;
