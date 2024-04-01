import { InjectRepository } from '@nestjs/typeorm';
import { ID } from 'src/common/types/type';
import { ModelEntity } from './entities/model.entity';
import { CreateModelDto } from './dto/create-model.dto';
import { Repository } from 'typeorm';
import { IModelRepository } from './interfaces/model.repository';

export class ModelRepository implements IModelRepository {
  constructor(
    @InjectRepository(ModelEntity)
    private repository: Repository<ModelEntity>,
  ) {}

  create(dto: ModelEntity): Promise<ModelEntity> {
    return this.repository.save(dto);
  }

  async createEntity(dto: CreateModelDto): Promise<ModelEntity> {
    const entity: ModelEntity = await this.repository.create(dto);
    return entity;
  }

  async findAll(): Promise<ModelEntity[]> {
    return this.repository.find();
  }

  async findOneById(id: ID): Promise<ModelEntity> {
    return this.repository.findOneBy({ id });
  }

  async delete(dto: ModelEntity): Promise<ModelEntity> {
    return this.repository.remove(dto);
  }
  async update(dto: ModelEntity): Promise<ModelEntity> {
    return this.repository.save(dto);
  }
}
