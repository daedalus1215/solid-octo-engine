import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  // automatically all requests will be piped through this middleware and we will now parse the JWT.
  app.use(cookieParser())
  // When whitelist is set to true, the ValidationPipe will only include 
  // properties that are present in the request body or query parameters 
  // if they match with the model properties. It effectively "whitelists" 
  // the properties, meaning it only accepts the expected ones and discards 
  // any additional ones
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
