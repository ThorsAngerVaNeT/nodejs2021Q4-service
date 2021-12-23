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

export default log;
