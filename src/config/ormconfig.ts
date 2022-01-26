import { ConnectionOptions } from 'typeorm';
// import config from './config';
console.log(process.env);
const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  migrationsRun: true,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/../migrations/*.ts`],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
// console.log(ormconfig);
export default ormconfig;
/* {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [`${__dirname}/**.entity{.ts,.js}`],
  synchronize: true,
  logging: true,
} */
