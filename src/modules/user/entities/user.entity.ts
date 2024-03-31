import { BaseEntity } from 'src/common/database/base.entity';
import { RoleEnum } from 'src/common/enums/enum';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 256, unique: true, nullable: false })
  phone: number;

  @Column({ name: 'full_name', type: 'varchar', length: 256, nullable: false })
  fullName: string;

  @Column({ type: 'enum', enum: RoleEnum, nullable: false })
  role: RoleEnum;

  @OneToOne(() => FileEntity, {
    onDelete: 'SET NULL',
    nullable: false,
  })
  @JoinColumn()
  avatar: FileEntity;

  @ManyToOne(() => CompanyEntity, (CompanyEntity) => CompanyEntity.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToMany(
    () => TransactionEntity,
    (TransactionEntity) => TransactionEntity.user,
  )
  transactions: TransactionEntity[];
}
