import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Model } from '../../../../domain/entities';
import { IModelRepository } from '../../../../domain/repositories/model-repository.interface';
import { ICreateModelUseCase } from './create-model.interface';
import { CreateModelInput } from './input/create-model.input';
import { ModelDomainValidationException } from '../../../../domain/exceptions';
import { DatabaseModelException } from '@printer/infrastructure/exceptions/database-model.exception';

@Injectable()
export class CreateModelService implements ICreateModelUseCase {
  private readonly logger = new Logger(CreateModelService.name);

  constructor(
    @Inject('IModelRepository')
    private readonly modelRepository: IModelRepository,
  ) {}
  async execute(input: CreateModelInput): Promise<void> {
    const { manufacturer, description, printOid, copyOid } = input;
    try {
      const newModel = Model.create(manufacturer, description, printOid, copyOid);

      await this.modelRepository.create(newModel);
    } catch (error) {
      this.logger.log(error.message);
      if (error instanceof ModelDomainValidationException) {
        throw new UnprocessableEntityException({
          message: error.message,
          errors: error.errors,
        });
      } else if (error instanceof DatabaseModelException) {
        throw new InternalServerErrorException(error.message);
      }
      throw error;
    }
  }
}
