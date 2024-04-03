import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyEntity } from './entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/entities/user.entity';
import { FileService } from '../file/file.service';
import { FileRepository } from '../file/file.repository';
import { FileEntity } from '../file/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity, UserEntity, FileEntity])],

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
    {
      provide: 'IUserService',
      useClass: UserService,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IFileService',
      useClass: FileService,
    },
    {
      provide: 'IFileRepository',
      useClass: FileRepository,
    },
  ],
})
export class CompanyModule {}
