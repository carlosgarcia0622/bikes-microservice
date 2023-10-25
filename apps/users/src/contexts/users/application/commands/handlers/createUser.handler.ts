import { Injectable, Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserDto } from '../../../domain/user.dto';
import { UsersRepository } from '../../../infraestructure/prisma/users.model.postgress';
import { CreatedUserEvent } from '../../events/impl/createdUser.event';
import { CreateUserCommand } from '../impl/createUser.command';
import { hash } from 'bcrypt';
import { User } from '@prisma/client';


//@CommandHandler(CreateUserCommand)
@Injectable()
export class CreateUserHandler{ //implements ICommandHandler<CreateUserCommand>

  constructor(
    // private readonly eventBus: EventBus,
    private readonly usersRepository: UsersRepository
  ) {}
  private readonly logger = new Logger(CreateUserCommand.name);
  async execute(user: UserDto): Promise<User> {
    this.logger.log(`[${this.execute.name}] :: INIT`);
    const { password: plainPassword } = user;
    const password = await hash(plainPassword, 10);
    return await this.usersRepository.create({...user, password} as UserDto);
  }
}
