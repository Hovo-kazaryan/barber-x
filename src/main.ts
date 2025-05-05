import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'users_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = {};
        for (const error of errors) {
          const field = error.property;
          const constraints = error.constraints;
          if (constraints) {
            formattedErrors[field] = Object.values(constraints)[0]; // take the first error message
          }
        }

        return new UnprocessableEntityException(formattedErrors);
      },
    }),
  );
  await app.listen();
}

bootstrap();
