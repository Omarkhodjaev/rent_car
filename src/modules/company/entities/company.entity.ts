import { BaseEntity } from 'src/common/database/base.entity';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { ModelEntity } from 'src/modules/model/entities/model.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('companies')
export class CompanyEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  name: string;

  @Column({ name: 'owner', type: 'int', nullable: true })
  owner: number;

  @OneToOne(() => FileEntity, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'logo_id' })
  logo: number;

  @OneToMany(() => UserEntity, (UserEntity) => UserEntity.company)
  users: UserEntity[];

  @OneToMany(() => CarEntity, (CarEntity) => CarEntity.company)
  cars: CarEntity[];

  @OneToMany(
    () => TransactionEntity,
    (TransactionEntity) => TransactionEntity.company,
  )
  transactions: TransactionEntity[];
}
