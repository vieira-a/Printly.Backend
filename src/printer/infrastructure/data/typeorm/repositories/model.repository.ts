import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { Model } from '@printer/domain/entities';
import { IModelRepository } from '@printer/domain/data/repositories';
import { DatabaseModelException } from '@printer/application/exceptions/database-model.exception';
import { InfrastructureException } from '@shared/exceptions/infrastructure.exception';
import { PrinterModel } from '../models/printer-model.model';
import { ModelDataMapper } from '../../mappers/model-data.mapper';

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
  async create(input: Model): Promise<Model> {
    try {
      const { manufacturer, description, printOid, copyOid } = input;
      const newModel = PrinterModel.create(manufacturer, description, printOid, copyOid);

      const result = await this.repository.save(newModel);
      return ModelDataMapper.toDomain(result);
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

  async existsByManufacturerAndDesciption(
    manufacturer: string,
    description: string,
  ): Promise<boolean> {
    try {
      const model = await this.repository.findOneBy({ manufacturer, description });

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

  async findById(id: string): Promise<Model | null> {
    try {
      const model = await this.repository.findOneBy({ id });
      return model ? ModelDataMapper.toDomain(model) : null;
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

  async update(input: Model): Promise<Model> {
    try {
      const modelToUpdate = ModelDataMapper.toModel(input);
      await this.repository.update(modelToUpdate.id, { ...modelToUpdate });

      const updatedModel = await this.findById(modelToUpdate.id);

      return ModelDataMapper.toDomain(updatedModel!);
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
