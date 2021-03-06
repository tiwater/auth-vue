import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle(process.env.npm_package_title)
    .setDescription(process.env.npm_package_description)
    .setVersion(process.env.npm_package_version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/apidocs', app, document);
  // Refer to：https://docs.nestjs.com/openapi/introduction

  app.enableCors();

  await app.listen(8000);
}
bootstrap();
