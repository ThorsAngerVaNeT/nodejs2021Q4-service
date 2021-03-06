const LOG_LEVEL_ARRAY = [
  'error',
  'warn',
  'info',
  'http',
  'verbose',
  'debug',
  'silly',
];

export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS, 10) || 12,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'SECRET_KEY',
  JWT_LIFETIME: process.env.JWT_LIFETIME || '600s',
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOG_LEVEL: LOG_LEVEL_ARRAY[Number(process.env.LOG_LEVEL) || 0],
  POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',
  POSTGRES_PORT: process.env.POSTGRES_PORT || 5432,
  POSTGRES_USER: process.env.POSTGRES_USER || 'user',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'user',
  POSTGRES_DB: process.env.POSTGRES_DB || 'trello',
  USE_FASTIFY: process.env.USE_FASTIFY || false,
});
