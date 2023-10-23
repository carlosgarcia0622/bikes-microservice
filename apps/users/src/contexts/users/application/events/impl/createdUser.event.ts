import { IEvent } from '@nestjs/cqrs';
import { UserDto } from '../../../domain/user.dto';

export class CreatedUserEvent implements IEvent {
  constructor(
    public readonly user: UserDto
  ) {}
}