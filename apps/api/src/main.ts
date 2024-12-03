import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('ebay-api')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3002, '0.0.0.0');
}
bootstrap();
