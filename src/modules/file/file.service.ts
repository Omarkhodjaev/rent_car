import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IFileRepository } from './interfaces/file.repository';
import { IFileService } from './interfaces/file.service';
import { ResData } from 'src/lib/resData';
import { FileEntity } from './entities/file.entity';
import { ID } from 'src/common/types/type';
import { FileNotFounException } from './exception/file.exception';
import * as fs from 'fs';
import { RedisKeys } from 'src/common/enums/enum';
import { Cache } from 'cache-manager';

@Injectable()
export class FileService implements IFileService {
  constructor(
    @Inject('IFileRepository') private readonly repository: IFileRepository,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}
  async create(createFileDto: any): Promise<ResData<FileEntity>> {
    await this.deleteDataInRedis(RedisKeys.All_FILES);
    const entity = await this.repository.createEntity(createFileDto);
    const data = await this.repository.create(entity);

    return new ResData('Created Successfully', HttpStatus.CREATED, data);
  }

  async findOne(id: ID): Promise<ResData<FileEntity>> {
    const data = await this.repository.findOneById(id);
    if (!data) {
      throw new FileNotFounException();
    }

    return new ResData('Found Successfully', HttpStatus.OK, data);
  }

  async findAll(): Promise<ResData<FileEntity[]>> {
    const data = await this.repository.findAll();

    return new ResData('Found Successfully', HttpStatus.OK, data);
  }

  async remove(id: number): Promise<ResData<FileEntity>> {
    const { data: foundFile } = await this.findOne(id);
    await this.deleteDataInRedis(RedisKeys.All_FILES);

    if (!foundFile) {
      throw new FileNotFounException();
    }

    fs.unlink(foundFile.url, (err) => {
      if (err) throw err;
    });

    const data = await this.repository.delete(foundFile);

    return new ResData('Deleted Successfully', HttpStatus.OK, data);
  }

  private async deleteDataInRedis(key: RedisKeys) {
    await this.cacheManager.del(key);
  }
}
