import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('School API')
  .setDescription('API documentation for the school backend')
  .setVersion('1.0')
  // .addTag('StarkEC Inc')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
app.enableCors(); // Enables CORS globallyapp.useGlobalPipes(new ValidationPipe());
await app.listen(3000);
}
bootstrap();
