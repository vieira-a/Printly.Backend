import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { PrinterModel } from '@printer/domain/entities';
import { IPrinterModelRepository } from '@printer/domain/data/repositories';
import { DatabaseModelException } from '@printer/application/exceptions/database-model.exception';
import { InfrastructureException } from '@shared/exceptions/infrastructure.exception';
import { PrinterModelEntity } from '../models/printer-model.entity';
import { PrinterModelDataMapper } from '../../mappers/printer-model-data.mapper';

const DatabaseModelExceptionMessage = 'Houve um erro no banco de dados relacionado ao modelo de impressora.';
const InfrastructureExceptionMessage = 'Houve um erro interno. Tente novamente mais tarde.';

@Injectable()
export class PrinterModelRepository implements IPrinterModelRepository {
  private readonly logger = new Logger(PrinterModelRepository.name);

  constructor(
    @InjectRepository(PrinterModelEntity)
    private readonly repository: Repository<PrinterModelEntity>,
  ) {}
  async create(input: PrinterModel): Promise<PrinterModel> {
    try {
      const newPrinterModel = PrinterModelDataMapper.toEntity(input);

      const result = await this.repository.save(newPrinterModel);
      return PrinterModelDataMapper.toDomain(result);
    } catch (error) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      }
      if (error instanceof Error) {
        this.logger.log(error.message);
      }
      throw new InfrastructureException(InfrastructureExceptionMessage);
    }
  }

  async existsByManufacturerAndDesciption(manufacturer: string, description: string): Promise<boolean> {
    try {
      const model = await this.repository.findOneBy({ manufacturer, description });

      return model ? true : false;
    } catch (error: unknown) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      }
      if (error instanceof Error) {
        this.logger.log(error.message);
      }
      throw new InfrastructureException(InfrastructureExceptionMessage);
    }
  }

  async existsById(id: string): Promise<boolean> {
    try {
      const printerModel = await this.repository.findOneBy({ id });

      return printerModel ? true : false;
    } catch (error) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      }
      if (error instanceof Error) {
        this.logger.log(error.message);
      }
      throw new InfrastructureException(InfrastructureExceptionMessage);
    }
  }

  async findById(id: string): Promise<PrinterModel | null> {
    try {
      const printerModel = await this.repository.findOneBy({ id });
      return printerModel ? PrinterModelDataMapper.toDomain(printerModel) : null;
    } catch (error) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      }
      if (error instanceof Error) {
        this.logger.log(error.message);
      }
      throw new InfrastructureException(InfrastructureExceptionMessage);
    }
  }

  async update(input: PrinterModel): Promise<PrinterModel | null> {
    try {
      const modelToUpdate = PrinterModelDataMapper.toEntity(input);
      await this.repository.update(modelToUpdate.id, { ...modelToUpdate });

      const updatedModel = await this.findById(modelToUpdate.id);
      return updatedModel ? PrinterModelDataMapper.toDomain(updatedModel) : null;
    } catch (error) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      }
      if (error instanceof Error) {
        this.logger.log(error.message);
      }
      throw new InfrastructureException(InfrastructureExceptionMessage);
    }
  }
}
