import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { contentParser } from 'fastify-multer';
import { AppModule } from './app.module';

async function bootstrap() {
  const isFastify = process.env.USE_FASTIFY === 'true';
  const NestjsPlatform = isFastify ? 'Fastify' : 'Express';

  const fastifyAdapter = new FastifyAdapter();

  const app = isFastify
    ? await NestFactory.create<NestFastifyApplication>(
        AppModule,
        fastifyAdapter
      )
    : await NestFactory.create(AppModule);

  if (isFastify) {
    await fastifyAdapter.register(contentParser);
  }

  app.useGlobalPipes(new ValidationPipe());
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
