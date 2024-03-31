import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { FileEntity } from 'src/modules/file/entities/file.entity'; // Correct the path if needed
import { ModelEntity } from 'src/modules/model/entities/model.entity'; // Correct the path if needed
import { BaseEntity } from 'src/common/database/base.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';

@Entity('cars')
export class CarEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'int', default: 0, nullable: false })
  price: number;

  @Column({ type: 'json', nullable: true })
  info: object;

  @ManyToOne(() => ModelEntity, (ModelEntity) => ModelEntity.cars)
  @JoinColumn({ name: 'model_id' })
  model: ModelEntity;

  @ManyToOne(() => CompanyEntity, (CompanyEntity) => CompanyEntity.cars)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToMany(
    () => TransactionEntity,
    (TransactionEntity) => TransactionEntity.car,
  )
  transactions: TransactionEntity[];
}
