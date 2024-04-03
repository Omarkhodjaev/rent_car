import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FileService } from '../file/file.service';
import { FileRepository } from '../file/file.repository';
import { FileEntity } from '../file/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FileEntity])],
  controllers: [UserController],
  providers: [
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
export class UserModule {}
