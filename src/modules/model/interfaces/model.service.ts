import { ResData } from 'src/lib/resData';
import { ID } from 'src/common/types/type';
import { CreateModelDto } from '../dto/create-model.dto';
import { ModelEntity } from '../entities/model.entity';

export interface IModelService {
  create(dto: CreateModelDto): Promise<ResData<ModelEntity>>;
  findAll(): Promise<ResData<Array<ModelEntity>>>;
  findOneById(id: ID): Promise<ResData<ModelEntity>>;
  delete(id: ID): Promise<ResData<ModelEntity>>;
  update(id: ID, dto: CreateModelDto): Promise<ResData<ModelEntity>>;
}
