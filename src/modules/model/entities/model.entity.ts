import { BaseEntity } from 'src/common/database/base.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('models')
@Index(['name', 'company_id'], { unique: true })
export class ModelEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', unique: true, nullable: false })
  name: string;

  @ManyToOne(() => CompanyEntity, (company) => company.id, { nullable: false })
  @JoinColumn({ name: 'company_id' })
  companyId: CompanyEntity;
}
