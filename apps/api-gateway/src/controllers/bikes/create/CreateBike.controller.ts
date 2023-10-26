import { Body, Controller, Inject, Logger, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { CreateBikeRequest } from './createUser.request';


@Controller('bikes')
@ApiTags('Bikes')
@ApiBearerAuth()
export class CreateBikeController {
  constructor(
    @Inject('USERS_RMQ_CLIENT') private rabbitMQ: ClientProxy
    ) {}
  private readonly logger = new Logger(CreateBikeController.name);
  
  @Post('')
  @UseGuards(AuthGuard)
  createBike(@Body() body: CreateBikeRequest) {
    this.logger.log(`[GATEWAY]: createBike`);
    //return this.rabbitMQ.emit('createBike', body);
    return true;
  }
}
