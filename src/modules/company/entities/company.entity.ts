import { BaseEntity } from 'src/common/database/base.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { ModelEntity } from 'src/modules/model/entities/model.entity';
// import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('companies')
export class CompanyEntity extends BaseEntity {
 
}
