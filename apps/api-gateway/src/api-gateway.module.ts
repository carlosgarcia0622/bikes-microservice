import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CreateUserController } from './controllers/users/create/createUser.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_TCP_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001
        }
      },
      {
        name: 'USERS_MQTT_CLIENT',
        transport: Transport.MQTT,
        options: {
          host: 'mqtt://localhost',
          port: 1883,
        }
      },
      {
        name: 'USERS_RMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://eafit:eafit0123456@b-fb3f3df8-31d9-4a8d-a7fe-edeb2a8028bf.mq.us-east-1.amazonaws.com:5671'],
          queue: 'bikes',
          queueOptions: {
            durable: true
          },
        },
      }
    ])
  ],
  controllers: [CreateUserController],
  providers: [],
})
export class ApiGatewayModule {}
