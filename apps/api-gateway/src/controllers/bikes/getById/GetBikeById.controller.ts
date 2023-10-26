import { Param, Controller, Inject, Logger, Post, Req, UseGuards, Get, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetBikeByIdBikeResponse } from './GetBikeById.response';


@Controller('bikes')
@ApiTags('Bikes')
@ApiBearerAuth()
export class GetBikeByIdController {
  constructor(
    @Inject('USERS_RMQ_CLIENT') private rabbitMQ: ClientProxy
    ) {}
  private readonly logger = new Logger(GetBikeByIdController.name);
  
  @Get('/:id')
  @ApiResponse({
    status: 404,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 200,
    type: GetBikeByIdBikeResponse})
  @ApiParam({name: 'id'})
  async getBikeById(@Param('id') id: string) {
    this.logger.log(`[GATEWAY]: getBikeById: ${id}`);
    const bike = await this.rabbitMQ.send('getBikeById', {id}).toPromise();
    if(!bike) throw new NotFoundException();
    return bike;

  }
}
