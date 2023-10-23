import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreatedUserEvent } from '../../events/impl/createdUser.event';
import { CreateUserCommand } from '../impl/createUser.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly userRepository: any
  ) {}
  private readonly logger = new Logger(CreateUserCommand.name);
  async execute(command: CreateUserCommand): Promise<void> {
    this.logger.log(`[${this.execute.name}] :: INIT`);
    const { name, documentNumber } = command;
    const user = await this.userRepository.create({name, documentNumber});
    this.eventBus.publish(
      new CreatedUserEvent(user),
    );
  }
}
