import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrinterModel } from '@printer/infrastructure/data/typeorm/models/printer-model.model';

const nodeEnv = process.env.NODE_ENV;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [PrinterModel],
        synchronize: nodeEnv === 'development' ? true : false,
      }),
    }),
  ],
})
export class DataTypeOrmModule {}
