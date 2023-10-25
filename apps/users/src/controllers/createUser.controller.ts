import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserHandler } from '../contexts/users/application/commands/handlers/createUser.handler';


@Controller()
  export class CreateUserController {
  constructor(
    private readonly createUserService: CreateUserHandler
  ) {}

  private readonly logger = new Logger(CreateUserController.name);
  
  //Broker-Based controller
  @EventPattern('createUser')
  async createUser(@Payload() data: any) {
    this.logger.log(`[USERS]: createUser :: INIT`);
    await this.createUserService.execute(data);
  }

  //Point-To-Point controller
  @MessagePattern('testMessage')
  getHelloTCP(name: string): string {
     return `Hello !`;
 }
}