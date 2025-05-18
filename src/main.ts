import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

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

  app.enableShutdownHooks();
  await app.listen();
  stopCommand();
}

bootstrap();

function stopCommand() {
  process.on('SIGINT', () => {
    const redBold = '\x1b[1m\x1b[31m';
    const yellow = '\x1b[33m';
    const cyanBold = '\x1b[1m\x1b[36m';
    const reset = '\x1b[0m';

    console.log(
      `\n${redBold}💀 Ctrl+C detected.${reset} ` +
        `${yellow}Run ${cyanBold}npm run exorcist${reset}${yellow} to stop all processes.${reset}`,
    );
  });
}
