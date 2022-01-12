import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'postgres',
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [`${__dirname}/../resources/**/*.model{.ts,.js}`],
  migrations: [`${__dirname}/../migrations/*.ts`],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
// console.log(config);
export default config;
