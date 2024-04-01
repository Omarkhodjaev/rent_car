import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { CarEntity } from './entities/car.entity';
import { ICarRepository } from './interfaces/car.repository';
import { Repository } from 'typeorm';

export class CarRepository implements ICarRepository {
  constructor(
    @InjectRepository(CarEntity) private repository: Repository<CarEntity>,
  ) {}
  create(dto: CarEntity): Promise<CarEntity> {
    return this.repository.save(dto);
  }
  createEntity(dto: CreateCarDto): Promise<CarEntity> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<CarEntity[]> {
    throw new Error('Method not implemented.');
  }
  findAllByCompanyId(): Promise<CarEntity[]> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: number): Promise<CarEntity> {
    throw new Error('Method not implemented.');
  }
  delete(dto: CarEntity): Promise<CarEntity> {
    throw new Error('Method not implemented.');
  }
  update(dto: CarEntity): Promise<CarEntity> {
    throw new Error('Method not implemented.');
  }
}
