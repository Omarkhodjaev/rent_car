import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyEntity } from './entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],

  controllers: [CompanyController],
  providers: [
    {
      provide: 'ICompanyService',
      useClass: CompanyService,
    },
    {
      provide: 'ICompanyRepository',
      useClass: CompanyRepository,
    },
  ],
})
export class CompanyModule {}
