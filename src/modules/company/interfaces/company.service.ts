import { ResData } from 'src/lib/resData';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { ID } from 'src/common/types/type';
import { CompanyEntity } from '../entities/company.entity';

export interface ICompanyService {
  create(dto: CreateCompanyDto): Promise<ResData<CompanyEntity>>;
  findAll(): Promise<ResData<Array<CompanyEntity>>>;
  findOne(id: ID): Promise<ResData<CompanyEntity>>;
  remove(id: ID): Promise<ResData<CompanyEntity>>;
  update(id: ID, dto: CreateCompanyDto): Promise<ResData<CompanyEntity>>;
  findOneByCompany(
    companyName: CreateCompanyDto,
  ): Promise<ResData<CompanyEntity>>;
}
