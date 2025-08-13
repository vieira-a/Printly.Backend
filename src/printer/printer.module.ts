import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelController } from './api/rest/controllers/model/model.controller';
import { CreateModelService } from './application/use-cases/model/create/create-model.service';
import {
  ModelPrinter,
  LocationModel,
  PrinterModel,
  CountingModel,
  CountingJobModel,
} from './infrastructure/data/typeorm/models';
import { UpdateModelService } from './application/use-cases/model/update/update-model.service';
import { LocationController } from './api/rest/controllers/location/location.controller';
import { CreateLocationService } from './application/use-cases/location/create/create-location.service';
import {
  LocationRepository,
  ModelRepository,
  PrinterRepository,
  CountingRepository,
  CountingJobRepository,
} from './infrastructure/data/typeorm/repositories';
import { UpdateLocationService } from './application/use-cases/location/update/update-location.service';
import { UpdateLocationDetails } from './domain/services/update-location-details.service';
import { PrinterController } from './api/rest/controllers/printer/printer.controller';
import { CreatePrinterService } from './application/use-cases/printer/create/create-printer.service';
import { UpdatePrinterService } from './application/use-cases/printer/update/update-printer.service';
import { RegisterCountingService } from './application/use-cases/counting/manual-counting/create/register-counting.service';
import { CreateAutoCountingService } from './application/use-cases/counting/auto-counting/create/create-auto-counting.service';
import { SnmpAutoCountingService } from './infrastructure/snmp/snmp-auto-counting.service';
import { FindPrinterService } from './application/use-cases/printer/find/find-printer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forFeature([
      ModelPrinter,
      LocationModel,
      PrinterModel,
      CountingModel,
      CountingJobModel,
    ]),
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
    FindPrinterService,
    {
      provide: 'IPrinterRepository',
      useClass: PrinterRepository,
    },
    RegisterCountingService,
    {
      provide: 'ICountingRepository',
      useClass: CountingRepository,
    },
    CreateAutoCountingService,
    {
      provide: 'IAutoCounting',
      useClass: SnmpAutoCountingService,
    },
    {
      provide: 'ICountingJobRepository',
      useClass: CountingJobRepository,
    },
  ],
  controllers: [ModelController, LocationController, PrinterController],
})
export class PrinterModule {}
