import { BaseEntity } from 'src/common/database/base.entity';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('models')
@Index(['name', 'company_id'], { unique: true })
export class ModelEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ nullable: true })
  company_id: number;

  @ManyToOne(() => CompanyEntity, (company) => company.id, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'company_id' })
  company: number;

  @OneToMany(() => CarEntity, (CarEntity) => CarEntity.model)
  cars: ModelEntity[];
}
