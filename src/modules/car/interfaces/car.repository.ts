import { ID } from 'src/common/types/type';
import { CreateCarDto } from '../dto/create-car.dto';
import { CarEntity } from '../entities/car.entity';

export interface ICarRepository {
  create(dto: CarEntity): Promise<CarEntity>;
  createEntity(dto: CreateCarDto): Promise<CarEntity>;
  findAll(): Promise<Array<CarEntity>>;
  findAllByCompanyId(): Promise<Array<CarEntity>>;
  findOneById(id: ID): Promise<CarEntity>;
  delete(dto: CarEntity): Promise<CarEntity>;
  update(dto: CarEntity): Promise<CarEntity>;
}
