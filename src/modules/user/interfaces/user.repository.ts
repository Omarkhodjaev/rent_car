import { ID } from 'src/common/types/type';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create(entity: UserEntity): Promise<UserEntity>;
  createEntity(dto: CreateUserDto): Promise<UserEntity>;
  update(entity: UserEntity): Promise<UserEntity>;
  createEntity(dto: CreateUserDto): Promise<UserEntity>;
  getOneById(id: ID): Promise<UserEntity | undefined>;
  getAll(): Promise<Array<UserEntity>>;
  remove(dto: UserEntity): Promise<UserEntity>;
  getByPhone(phone: string): Promise<UserEntity | undefined>;
}
