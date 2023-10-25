import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { LoginRequest } from './login.request';



@Controller('auth')
@ApiTags('Auth')
export class CreateUserController {
  constructor(
    @Inject('USERS_RMQ_CLIENT') private rabbitMQ: ClientProxy
    ) {}
  private readonly logger = new Logger(CreateUserController.name);
  
  @Post('')
  async createUser(@Body() body: LoginRequest) {
    this.logger.log(`[GATEWAY]: createUser`);
    this.rabbitMQ.emit('login', body);
    const response = await 

  }
}
