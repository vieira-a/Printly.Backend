import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelController } from './api/rest/controllers/model/model.controller';
import { CreateModelService } from './application/use-cases/model/create/create-model.service';
import { ModelRepository } from './infrastructure/data/typeorm/repositories/model.repository';
import { PrinterModel, LocationModel } from './infrastructure/data/typeorm/models';
import { UpdateModelService } from './application/use-cases/model/update/update-model.service';
import { LocationController } from './api/rest/controllers/location/location.controller';
import { CreateLocationService } from './application/use-cases/location/create/create-location.service';
import { LocationRepository } from './infrastructure/data/typeorm/repositories/location.repository';
import { UpdateLocationService } from './application/use-cases/location/update/update-location.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forFeature([PrinterModel, LocationModel]),
  ],
  providers: [
    CreateModelService,
    UpdateModelService,
    { provide: 'IModelRepository', useClass: ModelRepository },
    CreateLocationService,
    UpdateLocationService,
    { provide: 'ILocationRepository', useClass: LocationRepository },
  ],
  controllers: [ModelController, LocationController],
})
export class PrinterModule {}
