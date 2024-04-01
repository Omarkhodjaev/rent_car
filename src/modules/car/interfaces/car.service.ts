import { ResData } from 'src/lib/resData';
import { CarEntity } from '../entities/car.entity';
import { CreateCarDto } from '../dto/create-car.dto';
import { ID } from 'src/common/types/type';

export interface ICarService {
  create(dto: CreateCarDto): Promise<ResData<CarEntity>>;
  findAll(): Promise<ResData<Array<CarEntity>>>;
  findOne(id: ID): Promise<ResData<CarEntity>>;
  remove(id: ID): Promise<ResData<CarEntity>>;
  update(id: ID, dto: CreateCarDto): Promise<ResData<CarEntity>>;
  findAllByCompany(company: ID): Promise<ResData<Array<CarEntity>>>;
}
