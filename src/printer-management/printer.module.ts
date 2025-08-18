import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelController } from './api/rest/controllers/model/model.controller';
import { CreateModelService } from './application/use-cases/model/create/create-model.service';
import {
  PrinterEntity,
  PrinterModelEntity,
  InstallationLocationEntity,
  CountingEntity,
  CountingJobEntity,
} from './infrastructure/data/typeorm/models';
import { UpdateModelService } from './application/use-cases/model/update/update-model.service';
import { LocationController } from './api/rest/controllers/location/location.controller';
import { CreateInstallationLocationService } from './application/use-cases/location/create/create-installation-location.service';
import {
  InstallationLocationRepository,
  PrinterModelRepository,
  PrinterRepository,
  CountingRepository,
  CountingJobRepository,
} from './infrastructure/data/typeorm/repositories';
import { UpdateInstallationLocationService } from './application/use-cases/location/update/update-installation-location.service';
import { PrinterController } from './api/rest/controllers/printer/printer.controller';
import { CreatePrinterService } from './application/use-cases/printer/create/create-printer.service';
import { UpdatePrinterService } from './application/use-cases/printer/update/update-printer.service';
import { CreateManualCountingService } from './application/use-cases/counting/manual-counting/create/create-manual-counting.service';
import { CreateAutoCountingService } from './application/use-cases/counting/auto-counting/create/create-auto-counting.service';
import { SnmpAutoCountingService } from './infrastructure/snmp/snmp-auto-counting.service';
import { FindPrinterService } from './application/use-cases/printer/find/find-printer.service';
import { ProcessAutoCountingService } from './application/use-cases/counting/auto-counting/create/process-auto-counting.service';
import { ProcessPendingJobService } from './application/use-cases/counting/auto-counting/create/process-pending-job.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forFeature([
      PrinterEntity,
      PrinterModelEntity,
      InstallationLocationEntity,
      CountingEntity,
      CountingJobEntity,
    ]),
  ],
  providers: [
    CreatePrinterService,
    UpdatePrinterService,
    FindPrinterService,
    CreateModelService,
    UpdateModelService,
    CreateInstallationLocationService,
    UpdateInstallationLocationService,
    ProcessAutoCountingService,
    ProcessPendingJobService,
    CreateManualCountingService,
    CreateAutoCountingService,
    { provide: 'IPrinterRepository', useClass: PrinterRepository },
    { provide: 'ICountingRepository', useClass: CountingRepository },
    { provide: 'ICountingJobRepository', useClass: CountingJobRepository },
    { provide: 'IInstallationLocationRepository', useClass: InstallationLocationRepository },
    { provide: 'IPrinterModelRepository', useClass: PrinterModelRepository },
    { provide: 'IAutoCounting', useClass: SnmpAutoCountingService },
  ],
  controllers: [ModelController, LocationController, PrinterController],
})
export class PrinterModule {}
