import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
let origin = '';
if(process.env.NODE_ENV == 'production') {
  origin = 'localhost';
} else {
  origin = 'http://localhost:3000'
}
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
  app.enableCors({
    origin: process.env.NODE_ENV == 'production' ? 'http://localhost' : 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // allowedHeaders: [
    //   'Content-Type',
    //   'Authorization',
    //   'X-Requested-With',
    //   'Accept',
    // ],
  });
  console.log(process.env.NODE_ENV);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(process.cwd(), 'uploads', 'images'), {
    prefix: '/images',
  });
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
