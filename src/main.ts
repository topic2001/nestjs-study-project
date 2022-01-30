import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifySession from '@mgcrea/fastify-session';
import fastifyCookie from 'fastify-cookie';
import { fastifyHelmet } from 'fastify-helmet';
import { AppModule } from './app.module';
import './Global/custom.error';
import { PurrsongV3Service } from './modules/prisma/prisma.purrsongV3.service';
import { AllExceptionsFilter } from './global/exception.filter';
import { LoggingInterceptor } from './global/logging.interceptor';
import { sessionOptions } from './config/redis.session';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  const configService = app.get(ConfigService);
  const purrsongV3Service: PurrsongV3Service = app.get(PurrsongV3Service);
  purrsongV3Service.enableShutdownHooks(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter(purrsongV3Service));
  app.useGlobalInterceptors(new LoggingInterceptor(purrsongV3Service));

  app.register(fastifyCookie);
  app.register(fastifySession, sessionOptions(configService));

  app.enableCors();
  await app.register(fastifyHelmet);

  await app.listen(configService.get('port', 3500), '0.0.0.0');
}
bootstrap();
