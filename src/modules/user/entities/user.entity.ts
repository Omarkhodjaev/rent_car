import { RoleEnum } from 'src/common/enums/enum';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { Column, JoinColumn, OneToOne } from 'typeorm';

export class UserEntity {
  @Column({ name: 'phone_number', type: 'text', unique: true, nullable: false })
  phoneNumber: string;

  @Column({ name: 'full_name', type: 'varchar', nullable: false })
  fullName: string;

  @Column({ name: 'role', type: 'enum', enum: RoleEnum, nullable: false })
  role: RoleEnum;

  @OneToOne(() => FileEntity, (file) => file.user)
  @JoinColumn({ name: 'file_id' })
  avatar: FileEntity;
}
