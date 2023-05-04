/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService);

  const configSwagger = new DocumentBuilder()
    .setTitle('The "Users" service')
    .setDescription('Users service API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('spec', app, document);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  const port = configService.get<number>('application.port');
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:/${configService.get('application.port')}/${globalPrefix}`
  );
  Logger.log(
    `🎯 Current mode: ${configService.get<string>('application.environment')}`
  );
}

bootstrap();
