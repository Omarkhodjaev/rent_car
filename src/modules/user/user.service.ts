import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/user.service';
import { ResData } from 'src/lib/resData';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Cache } from 'cache-manager';
import { ID } from 'src/common/types/type';
import { UserNotFoundException } from './exception/user.exception';
import { IUserRepository } from './interfaces/user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly repository: IUserRepository,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async create(dto: CreateAuthDto): Promise<ResData<UserEntity>> {
    const userEntity = await this.repository.createEntity(dto);

    const data = await this.repository.create(userEntity);

    return new ResData<UserEntity>(
      'Created Successfully',
      HttpStatus.CREATED,
      data,
    );
  }

  async update(id: ID, dto: UpdateUserDto): Promise<ResData<UserEntity>> {
    const { data: foundUser } = await this.findOne(id);

    if (!foundUser) {
      throw new UserNotFoundException();
    }

    const updatedUser = Object.assign(foundUser, dto);
    const userEntity = await this.repository.createEntity(updatedUser);

    console.log(userEntity);

    const data = await this.repository.update(userEntity);

    return new ResData<UserEntity>('Updated Successfully', HttpStatus.OK, data);
  }

  async findOne(id: ID): Promise<ResData<UserEntity>> {
    const data = await this.repository.getOneById(id);

    return new ResData<UserEntity>('Found Successfully', HttpStatus.OK, data);
  }

  async findAll(): Promise<ResData<Array<UserEntity>>> {
    const data = await this.repository.getAll();

    return new ResData<UserEntity[]>('Found Successfully', HttpStatus.OK, data);
  }

  async findByPhoneNumber(phone: string): Promise<ResData<UserEntity>> {
    const data = await this.repository.getByPhone(phone);

    return new ResData<UserEntity>('Found Successfully', HttpStatus.OK, data);
  }

  async delete(id: ID): Promise<ResData<UserEntity>> {
    const { data: foundUser } = await this.findOne(id);

    const deletedData = await this.repository.remove(foundUser);

    return new ResData<UserEntity>(
      'Deleted Successfully',
      HttpStatus.OK,
      deletedData,
    );
  }
}
