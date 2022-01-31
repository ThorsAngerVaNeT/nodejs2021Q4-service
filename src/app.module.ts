import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
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
import { WinstonModule } from 'nest-winston';
import { winstonOptions } from './config/winston';
import { HttpExceptionFilter } from './http-exception';
import { LoggingInterceptor } from '@algoan/nestjs-logging-interceptor';

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
    WinstonModule.forRoot(winstonOptions),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
