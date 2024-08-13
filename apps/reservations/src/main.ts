import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  // When whitelist is set to true, the ValidationPipe will only include 
  // properties that are present in the request body or query parameters 
  // if they match with the model properties. It effectively "whitelists" 
  // the properties, meaning it only accepts the expected ones and discards 
  // any additional ones
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();
