import { ID } from 'src/common/types/type';
import { ModelEntity } from '../entities/model.entity';
import { CreateModelDto } from '../dto/create-model.dto';

export interface IModelRepository {
  create(dto: ModelEntity): Promise<ModelEntity>;
  createEntity(dto: CreateModelDto): Promise<ModelEntity>;
  findAll(): Promise<Array<ModelEntity>>;
  findOneById(id: ID): Promise<ModelEntity>;
  delete(dto: ModelEntity): Promise<ModelEntity>;
  update(dto: ModelEntity): Promise<ModelEntity>;
}
