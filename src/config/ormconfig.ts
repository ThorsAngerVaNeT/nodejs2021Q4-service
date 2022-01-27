import { ConnectionOptions } from 'typeorm';
// import config from './config';
// console.log(config());
// const configObj = config();

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

// console.log(ormconfig);

export = ormconfig;
