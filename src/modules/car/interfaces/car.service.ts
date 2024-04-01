import { ResData } from 'src/lib/resData';
import { CarEntity } from '../entities/car.entity';
import { CreateCarDto } from '../dto/create-car.dto';

export interface ICarService {
  create(dto: CreateCarDto): Promise<ResData<CarEntity>>;
}
