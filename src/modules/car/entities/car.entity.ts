import { BaseEntity } from 'src/common/database/base.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { ModelEntity } from 'src/modules/model/entities/model.entity';
import {
  Column,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

export class CarEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 256, nullable: false })
  name: string;

  @OneToMany(() => ModelEntity, (model) => model.id)
  @JoinColumn({ name: 'model_id' })
  model: Array<ModelEntity>;

  @ManyToOne(() => CompanyEntity, (company) => company.id)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToMany(() => FileEntity, (file) => file.car)
  info: Array<FileEntity>;
}
