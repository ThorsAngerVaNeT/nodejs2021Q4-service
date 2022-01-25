export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS, 10) || 12,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'SECRET_KEY',
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  // LOG_LEVEL: LOG_LEVEL_ARRAY[Number(process.env.LOG_LEVEL) || 0,
});
