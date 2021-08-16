import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './redis-io-adaptor';
import { SocketAdapter } from './socket-adaptor';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://localhost:5672'],
  //     queue: 'main_queue',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  app.enableCors({origin:'http://localhost', credentials:true,allowedHeaders:'Access-Control-Allow-Credentials'});
  app.useWebSocketAdapter(new SocketAdapter(app));
  await app.listen(8989);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
