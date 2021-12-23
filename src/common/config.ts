import dotenv from 'dotenv';
import path from 'path';
import { Level } from 'pino';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const LOG_LEVEL_ARRAY: Level[] = ['error', 'warn', 'info', 'debug', 'trace'];

export const PORT = process.env.PORT || 4000;
export const { NODE_ENV } = process.env;
export const { MONGO_CONNECTION_STRING } = process.env;
export const { JWT_SECRET_KEY } = process.env;
export const AUTH_MODE = process.env.AUTH_MODE === 'true';
export const LOG_LEVEL = LOG_LEVEL_ARRAY[Number(process.env.LOG_LEVEL) || 0];
