import { FileEntity } from 'src/modules/file/entities/file.entity';
import { OneToMany } from 'typeorm';

export class CarEntity {
  @OneToMany(() => FileEntity, (file) => file.car)
  files: Array<FileEntity>;
}
