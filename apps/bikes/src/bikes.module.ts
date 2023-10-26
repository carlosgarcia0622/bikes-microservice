import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CreateBikeService } from './contexts/bikes/application/createBike.service';
import { GetBikeByIdService } from './contexts/bikes/application/getBikeById.service';
import { PrismaService } from './contexts/bikes/infraestructure/prisma.service';
import { BikesRepository } from './contexts/bikes/infraestructure/users.postgres.repository';
import { CreateBikeController } from './controllers/createBike.controller';
import { GetBikeByIdController } from './controllers/getBikeById.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'USERS_RMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'bikes',
          queueOptions: {
            durable: true
          },
        },
      }
    ])
  ],
  controllers: [CreateBikeController, GetBikeByIdController],
  providers: [
    CreateBikeService,
    GetBikeByIdService,
    PrismaService,
    BikesRepository
  ],
})
export class BikesModule {}
