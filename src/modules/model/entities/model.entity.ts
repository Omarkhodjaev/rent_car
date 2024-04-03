import { BaseEntity } from 'src/common/database/base.entity';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('models')
export class ModelEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @ManyToOne(() => CompanyEntity, (company) => company.id)
  @JoinColumn({ name: 'company_id' })
  company: number;

  @OneToMany(() => CarEntity, (CarEntity) => CarEntity.model)
  cars: ModelEntity[];
}
