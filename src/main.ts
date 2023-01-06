import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('REST API GATEWAY')
    .setDescription('Общая точка входа для для всех rest api микросервисов')
    .setVersion('0.1')
    .build();

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'API Gateway for microservices',
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, customOptions);

  await app.listen(3000);
}
bootstrap();
