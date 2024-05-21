import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  
  const logger = new Logger('Main Gateway');

  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');

  await app.listen(envs.port);

  logger.log(`Gateway running on port ${ envs.port }`);

}
bootstrap();
