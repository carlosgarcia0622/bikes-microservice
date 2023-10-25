import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  
  const microserviceTcp = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
    host: 'localhost',
    port: 3001,
    },
    })

  const microserviceMQTT = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
    host: 'mqtt://localhost',
    port: 1883,
    },
    });
  const microserviceRabbitMQ = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://eafit:eafit0123456@b-fb3f3df8-31d9-4a8d-a7fe-edeb2a8028bf.mq.us-east-1.amazonaws.com:5671'],
      queue: 'bikes',
      queueOptions: {
        durable: true
      },
    },
    });
  await app.startAllMicroservices(); //Hybrid app, lisents tcp, and mqtt
}
bootstrap();
