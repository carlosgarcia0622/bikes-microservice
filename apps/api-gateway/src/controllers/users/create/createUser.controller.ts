import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserRequest } from './createUser.request';


@Controller('users')
@ApiTags('Users')
export class CreateUserController {
  constructor(
    @Inject('USERS_MQTT_CLIENT') private MQTT: ClientProxy,
    @Inject('USERS_RMQ_CLIENT') private rabbitMQ: ClientProxy
    ) {}
  private readonly logger = new Logger(CreateUserController.name);
  
  // @Post('')
  // createUser() {
  //   this.logger.log(`[GATEWAY]: createUser`);
  //   return this.MQTT.emit('createUser', {
  //       username: 'carlosgarcia0623',
  //       password: 'Password11*',
  //       role: 'admin'
  //   });
  // }
  @Post('')
  createUser(@Body() body: CreateUserRequest) {
    this.logger.log(`[GATEWAY]: createUser`);
    return this.rabbitMQ.emit('createUser', body);
  }
}
