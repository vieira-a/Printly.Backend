import { Module } from '@nestjs/common';
import { PrinterModule } from '@printer/printer.module';
import { DataTypeOrmModule } from '@shared/infrastructure/data/typeorm/data-typeorm.module';

@Module({
  imports: [DataTypeOrmModule, PrinterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
