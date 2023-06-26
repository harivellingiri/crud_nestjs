import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();
const cors = require("cors")
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: "https://localhost:3004",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }))
  const config = new DocumentBuilder()
    .setTitle('CRUD Operation')
    .setDescription('The crud API description')
    .setVersion('1.0')
    .addTag('crud')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3004);
}

bootstrap();
