import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IUpdateModelUseCase } from './update-model.interface';
import { UpdateModelInput } from './input/update-model.input';
import { UpdateModelOutput } from './output/update-model.output';
import { IModelRepository } from '@printer/domain/repositories/model-repository.interface';
import { ModelMapper } from '@printer/application/mappers/model.mapper';
import { ModelDomainValidationException } from '@printer/domain/exceptions';
import { DatabaseModelException } from '@printer/application/exceptions';
import { ModelNotFoundException } from '@printer/application/exceptions/model-not-found.exception';

@Injectable()
export class UpdateModelService implements IUpdateModelUseCase {
  private readonly logger = new Logger(UpdateModelService.name);

  constructor(
    @Inject('IModelRepository')
    private readonly modelRepository: IModelRepository,
  ) {}
  async execute(id: string, input: UpdateModelInput): Promise<UpdateModelOutput> {
    try {
      const model = await this.modelRepository.findById(id);

      if (!model) {
        throw new ModelNotFoundException(id);
      }

      model?.update(input);
      const updatedModel = await this.modelRepository.update(model!);

      return ModelMapper.toOutput(updatedModel);
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
