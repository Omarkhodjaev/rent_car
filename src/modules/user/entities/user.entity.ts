import { RoleEnum } from 'src/common/enums/enum';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { Column, JoinColumn, OneToMany, OneToOne } from 'typeorm';

export class UserEntity {
  @Column({ name: 'phone_number', type: 'text', unique: true, nullable: false })
  phoneNumber: string;

  @Column({ name: 'full_name', type: 'varchar', nullable: false })
  fullName: string;

  @Column({ name: 'role', type: 'enum', enum: RoleEnum, nullable: false })
  role: RoleEnum;

  @OneToOne(() => FileEntity, (file) => file.user)
  @JoinColumn({ name: 'avatar' })
  avatar: FileEntity;

  @OneToMany(() => CompanyEntity, (company) => company.owner)
  @JoinColumn({ name: 'company_id' })
  companyId: CompanyEntity;
}
