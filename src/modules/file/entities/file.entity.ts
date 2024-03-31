import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CarEntity } from 'src/modules/car/entities/car.entity'; // Correct the path if needed
import { UserEntity } from 'src/modules/user/entities/user.entity'; // Correct the path if needed
import { BaseEntity } from 'src/common/database/base.entity';

@Entity('files')
export class FileEntity extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  url: string;

  @Column({ type: 'text', nullable: false })
  mimeType: string;

  @Column({ type: 'int', nullable: false })
  size: number;

  @ManyToOne(() => CarEntity, (car) => car.id, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'car_id' })
  car: CarEntity;
}
