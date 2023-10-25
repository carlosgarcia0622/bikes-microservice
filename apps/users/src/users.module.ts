import { Module } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CreateUserHandler } from './contexts/users/application/commands/handlers/createUser.handler';
import { PrismaService } from './contexts/users/infraestructure/prisma/prisma.service';
import { CreateUserController } from './controllers/createUser.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersRepository } from './contexts/users/infraestructure/prisma/users.model.postgress';

export const CommandHandlers = [CreateUserHandler];
@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule,
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
          url: 'amqps://b-fb3f3df8-31d9-4a8d-a7fe-edeb2a8028bf.mq.us-east-1.amazonaws.com:5671'
        }
      }
    ])
  ],
  controllers: [CreateUserController],
  providers: [
    UsersRepository,
    PrismaService, 
    CreateUserHandler
    //...CommandHandlers
  ],
})
export class UsersModule {}
