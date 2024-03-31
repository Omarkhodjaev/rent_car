import { BaseEntity } from 'src/common/database/base.entity';
import { StatusEnum, StatusTrack } from 'src/common/enums/enum';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
  @ManyToOne(() => CompanyEntity, (company) => company.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'SET NULL',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CarEntity, (car) => car.id, {
    onDelete: 'SET NULL',
    nullable: false,
  })
  @JoinColumn({ name: 'car_id' })
  car: CarEntity;

  @Column({ name: 'total_price', type: 'number', nullable: false })
  price: number;

  @Column({ name: 'user_data', type: 'json', nullable: false })
  userData: object;

  @Column({ name: 'car_data', type: 'json', nullable: false })
  carData: object;

  @Column({ name: 'start_km', type: 'number', nullable: false, default: 0 })
  startKm: number;

  @Column({ name: 'end_km', type: 'number', nullable: false, default: 0 })
  endKm: number;

  @Column({ name: 'start_date', type: 'timestamp', nullable: false })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp', nullable: false })
  endDate: Date;

  @Column({ name: 'status', type: 'enum', enum: StatusEnum, nullable: false })
  status: StatusEnum;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ name: 'last_edited_at', type: 'timestamp', nullable: false })
  lastEditedAt: Date;

  @Column({ name: 'started_km', type: 'number', nullable: false, default: 0 })
  startedKm: number;

  @Column({ name: 'ended_km', type: 'number', nullable: false, default: 0 })
  endedKm: number;

  @Column({
    name: 'status_track',
    type: 'enum',
    enum: StatusTrack,
    nullable: false,
  })
  statusTrack: StatusTrack;
}
