import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelEntity } from './entities/model.entity';
import { ModelRepository } from './model.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ModelEntity])],

  controllers: [ModelController],
  providers: [
    {
      provide: 'IModelService',
      useClass: ModelService,
    },
    {
      provide: 'IModelRepository',
      useClass: ModelRepository,
    },
  ],
})
export class ModelModule {}
