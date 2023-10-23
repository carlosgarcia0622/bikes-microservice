import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly documentNumber: string
  ) {}
}