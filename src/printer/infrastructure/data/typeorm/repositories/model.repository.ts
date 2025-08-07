import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { Model } from '@printer/domain/entities';
import { IModelRepository } from '@printer/domain/repositories/model-repository.interface';
import { PrinterModel } from '../models/printer-model.model';
import { InfrastructureException } from '@shared/exceptions/infrastructure.exception';
import { DatabaseModelException } from '@printer/application/exceptions/database-model.exception';

const DatabaseModelExceptionMessage =
  'Houve um erro no banco de dados relacionado ao modelo de impressora.';
const InfrastructureExceptionMessage = 'Houve um erro interno. Tente novamente mais tarde.';

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
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      } else {
        this.logger.log(error.message);
        throw new InfrastructureException(InfrastructureExceptionMessage);
      }
    }
  }

  async findByManufacturerAndDescription(
    manufacturer: string,
    description: string,
  ): Promise<boolean> {
    try {
      const model = await this.repository.findOne({
        where: { manufacturer, description },
      });

      return model ? true : false;
    } catch (error) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      } else {
        this.logger.log(error.message);
        throw new InfrastructureException(InfrastructureExceptionMessage);
      }
    }
  }
}
