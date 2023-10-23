import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';

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
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
