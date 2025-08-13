import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrinterModule } from '@printer/printer.module';
import { DataTypeOrmModule } from '@shared/infrastructure/data/typeorm/data-typeorm.module';

@Module({
  imports: [ScheduleModule.forRoot(), DataTypeOrmModule, PrinterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
