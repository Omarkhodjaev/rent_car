import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { FileService } from '../file/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from '../file/entities/file.entity';
import { UserEntity } from '../user/entities/user.entity';
import { FileRepository } from '../file/file.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FileEntity])],
  controllers: [AuthController],
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
      provide: 'IAuthService',
      useClass: AuthService,
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
export class AuthModule {}
