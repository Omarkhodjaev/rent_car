import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { IUserRepository } from './interfaces/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}
  create(entity: UserEntity): Promise<UserEntity> {
    return this.repository.save(entity);
  }

  update(entity: UserEntity): Promise<UserEntity> {
    return this.repository.save(entity);
  }

  async createEntity(dto: CreateUserDto): Promise<UserEntity> {
    const entity: UserEntity = this.repository.create(dto);
    return entity;
  }

  getOneById(id: number): Promise<UserEntity> {
    return this.repository.findOneBy({ id });
  }

  getAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  remove(dto: UserEntity): Promise<UserEntity> {
    return this.repository.remove(dto);
  }

  getByPhone(phone: string): Promise<UserEntity> {
    return this.repository.findOneBy({ phone });
  }
}
