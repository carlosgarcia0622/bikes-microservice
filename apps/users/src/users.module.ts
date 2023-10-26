import { Module } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CreateUserHandler } from './contexts/users/application/commands/handlers/createUser.handler';
import { PrismaService } from './contexts/users/infraestructure/prisma/prisma.service';
import { CreateUserController } from './controllers/createUser.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersRepository } from './contexts/users/infraestructure/prisma/users.model.postgress';
import { LoginController } from './controllers/login.controller';
import { LoginApplication } from './contexts/users/application/login.application';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule,
    ClientsModule.register([
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
  controllers: [LoginController, CreateUserController],
  providers: [
    UsersRepository,
    PrismaService, 
    CreateUserHandler,
    LoginApplication
  ],
})
export class UsersModule {}
