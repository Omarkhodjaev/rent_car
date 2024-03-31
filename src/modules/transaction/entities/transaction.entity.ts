import { BaseEntity } from 'src/common/database/base.entity';
import { StatusEnum, StatusTrackeEnum } from 'src/common/enums/enum';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
  @Column({ type: 'int', name: 'start_km', nullable: false })
  startKm: number;

  @Column({ type: 'int', name: 'end_km', nullable: false })
  endKm: number;

  @Column({ type: 'int', name: 'started_km', nullable: true })
  startedKm: number;

  @Column({ type: 'int', name: 'ended_km', nullable: true })
  endedKm: number;

  @Column({
    type: 'date',
    name: 'start_date',
    nullable: false,
  })
  startDate: Date;

  @Column({ type: 'date', name: 'end_date', nullable: false })
  endDate: Date;

  @Column({ type: 'date', name: 'started_date', nullable: true })
  startedDate: Date;

  @Column({ type: 'date', name: 'ended_date', nullable: true })
  endedDate: Date;

  @Column({ type: 'int', name: 'price', nullable: false })
  price: number;

  @Column({
    type: 'json',
    nullable: true,
    name: 'car_data',
  })
  carData: object;

  @Column({
    type: 'json',
    name: 'user_data',
    nullable: true,
  })
  userData: object;

  @Column({
    type: 'enum',
    enum: StatusTrackeEnum,
    nullable: false,
  })
  statusTrack: StatusTrackeEnum;

  @Column({ type: 'enum', enum: StatusEnum, nullable: false })
  status: StatusEnum;

  @ManyToOne(
    () => CompanyEntity,
    (CompanyEntity) => CompanyEntity.transactions,
    {
      onDelete: 'SET NULL',
      nullable: true,
    },
  )
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.transactions, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CarEntity, (CarEntity) => CarEntity.transactions, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'car_id' })
  car: CarEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'last_edited_by' })
  updatedBy: UserEntity;
}
