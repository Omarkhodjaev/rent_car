import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { FileEntity } from 'src/modules/file/entities/file.entity'; // Correct the path if needed
import { ModelEntity } from 'src/modules/model/entities/model.entity'; // Correct the path if needed
import { BaseEntity } from 'src/common/database/base.entity';

@Entity('cars')
export class CarEntity extends BaseEntity {}
