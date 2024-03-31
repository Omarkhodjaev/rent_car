import { Module } from '@nestjs/common';
import { TransactionModule } from './modules/transaction/transaction.module';
import { ModelModule } from './modules/model/model.module';
import { CompanyModule } from './modules/company/company.module';
import { FileModule } from './modules/file/file.module';
import { CarModule } from './modules/car/car.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
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
