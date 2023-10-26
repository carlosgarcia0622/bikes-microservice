import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoginController } from './controllers/auth/login.controller';
import { CreateUserController } from './controllers/users/create/createUser.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '1h'},
      global: true,
  }),
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
  controllers: [
    LoginController, 
    CreateUserController
  ],
  providers: [],
})
export class ApiGatewayModule {}
