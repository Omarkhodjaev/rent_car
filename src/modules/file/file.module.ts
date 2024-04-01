import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileEntity } from './entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './file.repository';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { Request } from 'express';
import { FileTypeException } from './exception/file.exception';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
  ],
  controllers: [FileController],
  providers: [
    { provide: 'IFileService', useClass: FileService },
    { provide: 'IFileRepository', useClass: FileRepository },
  ],
})
export class FileModule {}
