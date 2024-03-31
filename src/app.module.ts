import { Module } from '@nestjs/common';
import { TransactionModule } from './modules/transaction/transaction.module';
import { ModelModule } from './modules/model/model.module';
import { CompanyModule } from './modules/company/company.module';
import { FileModule } from './modules/file/file.module';
import { CarModule } from './modules/car/car.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/user/entities/user.entity';
import { CarEntity } from './modules/car/entities/car.entity';
import { TransactionEntity } from './modules/transaction/entities/transaction.entity';
import { FileEntity } from './modules/file/entities/file.entity';
import { ModelEntity } from './modules/model/entities/model.entity';
import { CompanyEntity } from './modules/company/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2004',
      database: 'rent_car',
      entities: [
        UserEntity,
        CarEntity,
        TransactionEntity,
        ModelEntity,
        FileEntity,
        CompanyEntity,
      ],
      synchronize: true,
    }),

    AuthModule,
    UserModule,
    CarModule,
    FileModule,
    CompanyModule,
    ModelModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
