import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelController } from './api/rest/controllers/model/model.controller';
import { CreateModelService } from './application/use-cases/model/create/create-model.service';
import { ModelRepository } from './infrastructure/data/typeorm/repositories/model.repository';
import {
  ModelPrinter,
  LocationModel,
  PrinterModel,
  CountingModel,
} from './infrastructure/data/typeorm/models';
import { UpdateModelService } from './application/use-cases/model/update/update-model.service';
import { LocationController } from './api/rest/controllers/location/location.controller';
import { CreateLocationService } from './application/use-cases/location/create/create-location.service';
import { LocationRepository } from './infrastructure/data/typeorm/repositories/location.repository';
import { UpdateLocationService } from './application/use-cases/location/update/update-location.service';
import { UpdateLocationDetails } from './domain/services/update-location-details.service';
import { PrinterController } from './api/rest/controllers/printer/printer.controller';
import { CreatePrinterService } from './application/use-cases/printer/create/create-printer.service';
import { PrinterRepository } from './infrastructure/data/typeorm/repositories/printer.repository';
import { UpdatePrinterService } from './application/use-cases/printer/update/update-printer.service';
import { RegisterCountingService } from './application/use-cases/printer/update/register-counting.service';
import { CountingRepository } from './infrastructure/data/typeorm/repositories/counting.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forFeature([ModelPrinter, LocationModel, PrinterModel, CountingModel]),
  ],
  providers: [
    CreateModelService,
    UpdateModelService,
    { provide: 'IModelRepository', useClass: ModelRepository },
    CreateLocationService,
    UpdateLocationService,
    { provide: 'ILocationRepository', useClass: LocationRepository },
    UpdateLocationDetails,
    CreatePrinterService,
    UpdatePrinterService,
    {
      provide: 'IPrinterRepository',
      useClass: PrinterRepository,
    },
    RegisterCountingService,
    {
      provide: 'ICountingRepository',
      useClass: CountingRepository,
    },
  ],
  controllers: [ModelController, LocationController, PrinterController],
})
export class PrinterModule {}
