import { ConnectionOptions } from 'typeorm';
import config from './config';
// console.log(config());
const configObj = config();

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: configObj.POSTGRES_HOST,
  port: +configObj.POSTGRES_PORT,
  username: configObj.POSTGRES_USER,
  password: configObj.POSTGRES_PASSWORD,
  database: configObj.POSTGRES_DB,
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
