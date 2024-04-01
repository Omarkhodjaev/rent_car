import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ICarService } from './interfaces/car.service';
import { ResData } from 'src/lib/resData';
import { CreateCarDto } from './dto/create-car.dto';
import { CarEntity } from './entities/car.entity';
import { ICarRepository } from './interfaces/car.repository';
import { Cache } from 'cache-manager';
import { ID } from 'src/common/types/type';
import { CarNotFoundException } from './exception/car.exception';
import { RedisKeys } from 'src/common/enums/enum';

@Injectable()
export class CarService implements ICarService {
  constructor(
    @Inject('ICarRepository')
    private readonly repository: ICarRepository,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async create(dto: CreateCarDto): Promise<ResData<CarEntity>> {
    await this.deleteDataInRedis(RedisKeys.ALL_CARS);

    const entity = await this.repository.createEntity(dto);
    const data = await this.repository.create(entity);

    return new ResData<CarEntity>(
      'Created successfully',
      HttpStatus.CREATED,
      data,
    );
  }

  async findAll(): Promise<ResData<CarEntity[]>> {
    const data = await this.repository.findAll();
    return new ResData<CarEntity[]>(
      'Found all successfully',
      HttpStatus.OK,
      data,
    );
  }

  async findOne(id: ID): Promise<ResData<CarEntity>> {
    const data = await this.repository.findOneById(id);

    if (!data) {
      throw new CarNotFoundException();
    }

    return new ResData<CarEntity>('Found successfully', HttpStatus.OK, data);
  }

  async remove(id: ID): Promise<ResData<CarEntity>> {
    await this.deleteDataInRedis(RedisKeys.ALL_CARS);

    const { data: foundCar } = await this.findOne(id);

    const data = await this.repository.delete(foundCar);

    return new ResData<CarEntity>('Deleted successfully', HttpStatus.OK, data);
  }

  async update(id: ID, dto: CreateCarDto): Promise<ResData<CarEntity>> {
    await this.deleteDataInRedis(RedisKeys.ALL_CARS);

    const { data: foundCar } = await this.findOne(id);

    const entity = await this.repository.createEntity(dto);

    const updatedCar = Object.assign(foundCar, entity);

    const data = await this.repository.update(updatedCar);

    return new ResData<CarEntity>('Updated successfully', HttpStatus.OK, data);
  }

  async findAllByCompany(companyId: ID): Promise<ResData<CarEntity[]>> {
    const data = await this.repository.findAllByCompanyId(companyId);
    return new ResData<CarEntity[]>(
      'Found all cars by company id successfully',
      HttpStatus.OK,
      data,
    );
  }

  private async deleteDataInRedis(key: RedisKeys) {
    await this.cacheManager.del(key);
  }
}
