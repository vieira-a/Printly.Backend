import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { Model } from '@printer/domain/entities';
import { IModelRepository } from '@printer/domain/repositories/model-repository.interface';
import { PrinterModel } from '../models/printer-model.model';
import { TypeOrmException } from '@shared/infrastructure/data/typeorm/exceptions/typeorm.exception';
import { InfrastructureException } from '@shared/exceptions/infrastructure.exception';

@Injectable()
export class ModelRepository implements IModelRepository {
  private readonly logger = new Logger(ModelRepository.name);

  constructor(
    @InjectRepository(PrinterModel)
    private readonly repository: Repository<PrinterModel>,
  ) {}
  async create(input: Model): Promise<void> {
    try {
      const { manufacturer, description, printOid, copyOid } = input;
      const newModel = PrinterModel.create(manufacturer, description, printOid, copyOid);

      await this.repository.save(newModel);
    } catch (error) {
      if (error instanceof TypeORMError) {
        this.logger.error(error.message);
        throw new TypeOrmException();
      } else {
        this.logger.error(error.message);
        throw new InfrastructureException();
      }
    }
  }
}
