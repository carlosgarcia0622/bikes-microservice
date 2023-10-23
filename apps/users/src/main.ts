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
  await app.startAllMicroservices(); //Hybrid app, lisents tcp, and mqtt
}
bootstrap();
