import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ICompanyRepository } from './interfaces/company.repository';
import { CompanyEntity } from './entities/company.entity';
import { ResData } from 'src/lib/resData';
import { ID } from 'src/common/types/type';
import { CompanyNotFoundException } from './exception/company.exception';
import { Cache } from 'cache-manager';
import { RedisKeys } from 'src/common/enums/enum';
import { ICompanyService } from './interfaces/company.service';

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(
    @Inject('ICompanyRepository')
    private readonly repository: ICompanyRepository,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async findOneByCompany(
    dto: CreateCompanyDto,
  ): Promise<ResData<CompanyEntity>> {
    const data = await this.repository.findOneByName(dto.name);
    return new ResData<CompanyEntity>(
      'found successfully',
      HttpStatus.OK,
      data,
    );
  }

  async create(dto: CreateCompanyDto): Promise<ResData<CompanyEntity>> {
    await this.deleteDataInRedis(RedisKeys.ALL_COMPANIES);

    const entity = await this.repository.createEntity(dto);
    console.log(entity);
    
    const data = await this.repository.create(entity);

    return new ResData<CompanyEntity>(
      'Created successfully',
      HttpStatus.CREATED,
      data,
    );
  }

  async findAll(): Promise<ResData<CompanyEntity[]>> {
    const data = await this.repository.findAll();
    return new ResData<CompanyEntity[]>(
      'Found all successfully',
      HttpStatus.OK,
      data,
    );
  }

  async findOne(id: ID): Promise<ResData<CompanyEntity>> {
    const data = await this.repository.findOneById(id);

    if (!data) {
      throw new CompanyNotFoundException();
    }

    return new ResData<CompanyEntity>(
      'Found successfully',
      HttpStatus.OK,
      data,
    );
  }

  async remove(id: ID): Promise<ResData<CompanyEntity>> {
    await this.deleteDataInRedis(RedisKeys.ALL_COMPANIES);

    const { data: foundCompany } = await this.findOne(id);

    const data = await this.repository.delete(foundCompany);

    return new ResData<CompanyEntity>(
      'Deleted successfully',
      HttpStatus.OK,
      data,
    );
  }

  async update(id: ID, dto: CreateCompanyDto): Promise<ResData<CompanyEntity>> {
    await this.deleteDataInRedis(RedisKeys.ALL_COMPANIES);

    const { data: foundCompany } = await this.findOne(id);

    const entity = await this.repository.createEntity(dto);

    const updatedCompany = Object.assign(foundCompany, entity);

    const data = await this.repository.update(updatedCompany);

    return new ResData<CompanyEntity>(
      'Updated successfully',
      HttpStatus.OK,
      data,
    );
  }

  private async deleteDataInRedis(key: RedisKeys) {
    await this.cacheManager.del(key);
  }
}
