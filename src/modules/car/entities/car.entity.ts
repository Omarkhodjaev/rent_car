import { BaseEntity } from 'src/common/database/base.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { Column, OneToMany } from 'typeorm';

export class CarEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 256, nullable: false })
  name: string;

  @OneToMany(() => FileEntity, (file) => file.car)
  files: Array<FileEntity>;
}
