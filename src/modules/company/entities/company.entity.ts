import { BaseEntity } from 'src/common/database/base.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('companies')
export class CompanyEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', unique: true, nullable: false })
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.companyId, { nullable: false })
  @JoinColumn({ name: 'avatar' })
  owner: UserEntity;

  @OneToOne(() => FileEntity, (file) => file.id)
  @JoinColumn({ name: 'logo' })
  logo: FileEntity;
}
