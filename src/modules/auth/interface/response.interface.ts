import { UserEntity } from 'src/modules/user/entities/user.entity';

export interface ILoginData {
  data: UserEntity;
  token: string;
}

export interface IRegister {
  data: UserEntity;
  token: string;
}
