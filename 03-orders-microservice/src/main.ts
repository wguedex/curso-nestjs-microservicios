import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { envs } from './config/envs';

async function bootstrap() {
  const logger = new Logger('Orders-ms-main');
   
  const app = await NestFactory.create(AppModule);
  logger.log(`Products Microservice running on port ${envs.port}`)
}
bootstrap();
