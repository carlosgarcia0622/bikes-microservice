import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

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
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
