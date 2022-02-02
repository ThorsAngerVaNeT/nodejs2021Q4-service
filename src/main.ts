import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { contentParser } from 'fastify-multer';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { winstonOptions } from './config/winston';

async function bootstrap() {
  const isFastify = process.env.USE_FASTIFY === 'true';
  const NestjsPlatform = isFastify ? 'Fastify' : 'Express';

  const fastifyAdapter = new FastifyAdapter();
  const NestAppOpts = { logger: WinstonModule.createLogger(winstonOptions) };

  const app = isFastify
    ? await NestFactory.create<NestFastifyApplication>(
        AppModule,
        fastifyAdapter,
        NestAppOpts
      )
    : await NestFactory.create(AppModule, NestAppOpts);

  if (isFastify) {
    await fastifyAdapter.register(contentParser);
  }

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Trello API')
    .setDescription('Trello API description')
    .setVersion('1.0')
    .addTag('trello')
    .addBearerAuth(
      {
        in: 'header',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
      },
      'token'
    )
    .addServer(`http://localhost:${configService.get('port')}`)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(configService.get('port'), '0.0.0.0', () => {
    console.log(
      `Nest.js using ${NestjsPlatform} and running on port: ${configService.get(
        'port'
      )}`
    );
  });
}
bootstrap();
