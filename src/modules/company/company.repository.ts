import { Repository } from 'typeorm';
import { ICompanyRepository } from './interfaces/company.repository';
import { CompanyEntity } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ID } from 'src/common/types/type';

export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(CompanyEntity)
    private repository: Repository<CompanyEntity>,
  ) {}
  async findOneByName(name: string): Promise<CompanyEntity> {
    return await this.repository.findOne({
      where: {
        name: name,
      },
    });
  }

  async create(dto: CompanyEntity): Promise<CompanyEntity> {
    return await this.repository.save(dto);
  }

  async createEntity(dto: CreateCompanyDto): Promise<CompanyEntity> {
    const entity: CompanyEntity = await this.repository.create(dto);
    return entity;
  }

  async findAll(): Promise<CompanyEntity[]> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<CompanyEntity> {
    return await this.repository.findOneBy({ id });
  }

  async delete(dto: CompanyEntity): Promise<CompanyEntity> {
    return await this.repository.remove(dto);
  }
  async update(dto: CompanyEntity): Promise<CompanyEntity> {
    return await this.repository.save(dto);
  }
}
