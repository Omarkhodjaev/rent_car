import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelEntity } from './entities/model.entity';
import { ModelRepository } from './model.repository';
import { CompanyService } from '../company/company.service';
import { CompanyRepository } from '../company/company.repository';
import { CompanyEntity } from '../company/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModelEntity, CompanyEntity])],

  controllers: [ModelController],
  providers: [
    {
      provide: 'IModelService',
      useClass: ModelService,
    },
    {
      provide: 'IModelRepository',
      useClass: ModelRepository,
    },

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
export class ModelModule {}
