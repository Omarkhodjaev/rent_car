import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Cache } from 'cache-manager';
import { IModelRepository } from './interfaces/model.repository';
import { ResData } from 'src/lib/resData';
import { ModelEntity } from './entities/model.entity';
import { ID } from 'src/common/types/type';
import { ModelNotFoundException } from './exception/company.exception';
import { RedisKeys } from 'src/common/enums/enum';

@Injectable()
export class ModelService {
  constructor(
    @Inject('IModelRepository')
    private readonly repository: IModelRepository,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async create(dto: CreateModelDto): Promise<ResData<ModelEntity>> {
    await this.deleteDataInRedis(RedisKeys.All_MODELS);

    const entity = await this.repository.createEntity(dto);
    const data = await this.repository.create(entity);

    return new ResData<ModelEntity>(
      'Created successfully',
      HttpStatus.CREATED,
      data,
    );
  }

  async findAll(): Promise<ResData<ModelEntity[]>> {
    const data = await this.repository.findAll();
    return new ResData<ModelEntity[]>(
      'Found all successfully',
      HttpStatus.OK,
      data,
    );
  }

  async findOne(id: ID): Promise<ResData<ModelEntity>> {
    const data = await this.repository.findOneById(id);

    if (!data) {
      throw new ModelNotFoundException();
    }

    return new ResData<ModelEntity>('Found successfully', HttpStatus.OK, data);
  }

  async remove(id: ID): Promise<ResData<ModelEntity>> {
    await this.deleteDataInRedis(RedisKeys.All_MODELS);

    const { data: foundModel } = await this.findOne(id);

    const data = await this.repository.delete(foundModel);

    return new ResData<ModelEntity>(
      'Deleted successfully',
      HttpStatus.OK,
      data,
    );
  }

  async update(id: ID, dto: CreateModelDto): Promise<ResData<ModelEntity>> {
    await this.deleteDataInRedis(RedisKeys.All_MODELS);

    const { data: foundModel } = await this.findOne(id);

    const entity = await this.repository.createEntity(dto);

    const updatedModel = Object.assign(foundModel, entity);

    const data = await this.repository.update(updatedModel);

    return new ResData<ModelEntity>(
      'Updated successfully',
      HttpStatus.OK,
      data,
    );
  }

  private async deleteDataInRedis(key: RedisKeys) {
    await this.cacheManager.del(key);
  }
}
