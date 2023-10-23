import { Controller } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserCommand } from '../contexts/users/application/commands/impl/createUser.command';


@Controller()
  export class CreateUserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
  ) {}
  
  //Broker-Based controller
  @EventPattern('createUser')
  async createUser(@Payload() data: any) {
    this.commandBus.execute(new CreateUserCommand(data.name, data.documentNumber));
  }

  //Point-To-Point controller
  @MessagePattern('testMessage')
  getHelloTCP(name: string): string {
     return `Hello !`;
 }
}