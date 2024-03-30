import { BaseEntity } from 'src/common/database/base.entity';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('files')
export class FileEntity extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  url: string;

  @Column({ type: 'text', length: 256, nullable: false })
  mimeType: string;

  @Column({ type: 'int', nullable: false })
  size: number;

  @ManyToOne(() => CarEntity, (car) => car.info, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'car_id' })
  car: CarEntity;

  @OneToOne(() => UserEntity, (user) => user.avatar)
  user: UserEntity;
}
