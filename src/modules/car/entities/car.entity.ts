import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
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

  @ManyToOne(() => ModelEntity, (ModelEntity) => ModelEntity.cars, {
    nullable: true,
  })
  @JoinColumn({ name: 'model_id' })
  model: number;

  @ManyToOne(() => CompanyEntity, (CompanyEntity) => CompanyEntity.cars, {
    nullable: true,
  })
  @JoinColumn({ name: 'company_id' })
  company: number;

  @OneToMany(
    () => TransactionEntity,
    (TransactionEntity) => TransactionEntity.car,
  )
  transactions: number[];
}
