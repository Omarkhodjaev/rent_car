import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { BaseEntity } from 'src/common/database/base.entity';

@Entity('files')
export class FileEntity extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  url: string;

  @Column({ type: 'text', nullable: false })
  mimetype: string;

  @Column({ type: 'int', nullable: false })
  size: number;

  @ManyToOne(() => CarEntity, (car) => car.id, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'car_id' })
  car: CarEntity; 
}
