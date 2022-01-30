import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';
import { FileModule } from './file/file.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import config from './config/config';
import * as ormconfig from './config/ormconfig';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppLoggerMiddleware } from './logger';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    TypeOrmModule.forRoot(ormconfig),
    UsersModule,
    BoardsModule,
    ColumnsModule,
    TasksModule,
    FileModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
  // configure(consumer: MiddlewareConsumer): void {
  //   consumer.apply(AppLoggerMiddleware).forRoutes('*');
  // }
}
