import { ResData } from 'src/lib/resData';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { CompanyEntity } from '../entities/company.entity';
import { ID } from 'src/common/types/type';

export interface ICompanyService {
  create(dto: CreateCompanyDto): Promise<ResData<CompanyEntity>>;
  findAll(): Promise<ResData<Array<CompanyEntity>>>;
  findOneById(id: ID): Promise<ResData<CompanyEntity>>;
  delete(id: ID): Promise<ResData<CompanyEntity>>;
  update(id: ID, dto: CreateCompanyDto): Promise<ResData<CompanyEntity>>;
}
