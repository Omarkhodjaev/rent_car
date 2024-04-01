import { ID } from 'src/common/types/type';
import { CompanyEntity } from '../entities/company.entity';
import { CreateCompanyDto } from '../dto/create-company.dto';

export interface ICompanyRepository {
  create(dto: CompanyEntity): Promise<CompanyEntity>;
  createEntity(dto: CreateCompanyDto): Promise<CompanyEntity>;
  findAll(): Promise<Array<CompanyEntity>>;
  findOneById(id: ID): Promise<CompanyEntity>;
  delete(dto: CompanyEntity): Promise<CompanyEntity>;
  update(dto: CompanyEntity): Promise<CompanyEntity>;
}
