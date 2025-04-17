import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(3000);
}

bootstrap();
