import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { logger } from './global/winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SwaggerDOCS - https://docs.nestjs.com/openapi/introduction
  // await app.init() // fastify demands this

  const config = new DocumentBuilder() // create options
    .setTitle('Internship Application')
    .setDescription('Application developed as teaching aid')
    .setVersion('v1')
    .build();

  const document = SwaggerModule.createDocument(app, config); // create a document

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  logger.info(`App is running on ${await app.getUrl()}`);
}
bootstrap();
