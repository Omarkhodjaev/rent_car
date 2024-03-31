import { BaseEntity } from 'src/common/database/base.entity';
import { StatusEnum, StatusTrack } from 'src/common/enums/enum';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('transactions')
export class TransactionEntity extends BaseEntity {

}
