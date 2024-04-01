import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { CarEntity } from './entities/car.entity';
import { ICarRepository } from './interfaces/car.repository';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/type';

export class CarRepository implements ICarRepository {
  constructor(
    @InjectRepository(CarEntity) private repository: Repository<CarEntity>,
  ) {}

  create(dto: CarEntity): Promise<CarEntity> {
    return this.repository.save(dto);
  }

  async createEntity(dto: CreateCarDto): Promise<CarEntity> {
    const entity: CarEntity = await this.repository.create(dto);
    return entity;
  }

  async findAll(): Promise<CarEntity[]> {
    return this.repository.find();
  }

  async findAllByCompanyId(company: ID): Promise<CarEntity[]> {
    return this.repository.find({ where: { company } });
  }

  async findOneById(id: number): Promise<CarEntity> {
    return this.repository.findOneBy({ id });
  }

  async delete(dto: CarEntity): Promise<CarEntity> {
    return this.repository.remove(dto);
  }
  async update(dto: CarEntity): Promise<CarEntity> {
    return this.repository.save(dto);
  }
}
