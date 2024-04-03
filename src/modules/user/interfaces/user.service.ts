import { CreateAuthDto, loginDto } from 'src/modules/auth/dto/create-auth.dto';
import { UserEntity } from '../entities/user.entity';
import { ResData } from 'src/lib/resData';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ID } from 'src/common/types/type';
import { ILoginData, IRegister } from 'src/modules/auth/interface/response.interface';

export interface IUserService {
  create(dto: CreateAuthDto): Promise<ResData<IRegister>>;
  login(dto: loginDto): Promise<ResData<ILoginData>>;
  update(id: ID, dto: UpdateUserDto): Promise<ResData<UserEntity>>;
  findOne(id: ID): Promise<ResData<UserEntity>>;
  findAll(): Promise<ResData<Array<UserEntity>>>;
  findByPhoneNumber(phone: string): Promise<ResData<UserEntity>>;
  delete(id: ID): Promise<ResData<UserEntity>>;
}


