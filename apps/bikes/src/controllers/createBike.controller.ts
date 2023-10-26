import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateBikeService } from '../contexts/bikes/application/createBike.service';

@Controller()
  export class CreateBikeController {
  constructor(
    private readonly createBikeService: CreateBikeService
  ) {}

  private readonly logger = new Logger(CreateBikeController.name);

  @EventPattern('createBike')
  async createBike(@Payload() data: any) {
    this.logger.log(`[Bikes]: createBike :: INIT`);
    await this.createBikeService.execute(data);
  }
}