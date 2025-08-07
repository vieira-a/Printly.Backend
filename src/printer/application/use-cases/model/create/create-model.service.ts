import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Model } from '@printer/domain/entities';
import { IModelRepository } from '@printer/domain/repositories/model-repository.interface';
import { ModelDomainValidationException } from '@printer/domain/exceptions';
import { DatabaseModelException, ModelConflictException } from '@printer/application/exceptions';
import { ICreateModelUseCase } from './create-model.interface';
import { CreateModelInput } from './input/create-model.input';
import { CreateModelOutput } from './output/create-model.output';
import { ModelMapper } from '@printer/application/mappers/model.mapper';

@Injectable()
export class CreateModelService implements ICreateModelUseCase {
  private readonly logger = new Logger(CreateModelService.name);

  constructor(
    @Inject('IModelRepository')
    private readonly modelRepository: IModelRepository,
  ) {}
  async execute(input: CreateModelInput): Promise<CreateModelOutput> {
    const { manufacturer, description, printOid, copyOid } = input;
    try {
      const newModel = Model.create(manufacturer, description, printOid, copyOid);

      const modelAlreadyExists = await this.modelRepository.existsByManufacturerAndDesciption(
        manufacturer,
        description,
      );

      if (modelAlreadyExists) {
        throw new ModelConflictException(manufacturer, description);
      }

      const result = await this.modelRepository.create(newModel);
      return ModelMapper.toOutput(result);
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
