import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelController } from './api/rest/controllers/model.controller';
import { CreateModelService } from './application/use-cases/model/create/create-model.service';
import { ModelRepository } from './infrastructure/data/typeorm/repositories/model.repository';
import { PrinterModel } from './infrastructure/data/typeorm/models/printer-model.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forFeature([PrinterModel]),
  ],
  providers: [CreateModelService, { provide: 'IModelRepository', useClass: ModelRepository }],
  controllers: [ModelController],
})
export class PrinterModule {}
