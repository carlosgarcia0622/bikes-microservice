import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';


@Controller('users')
export class CreateUserController {
  constructor(@Inject('USERS_MQTT_CLIENT') private MQTT: ClientProxy) {}

  @Post()
  createUser() {
    return this.MQTT.emit('createUser', {
        name: 'Carlos García',
        documentNumber: '1036954586'
    });
  }
}
