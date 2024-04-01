import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CarRepository } from './car.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity])],

  controllers: [CarController],
  providers: [
    {
      provide: 'ICarService',
      useClass: CarService,
    },
    {
      provide: 'ICarRepository',
      useClass: CarRepository,
    },
  ],
})
export class CarModule {}
