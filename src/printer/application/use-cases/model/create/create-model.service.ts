import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Model } from '../../../../domain/entities';
import { IModelRepository } from '../../../../domain/repositories/model-repository.interface';
import { ICreateModelUseCase } from './create-model.interface';
import { CreateModelInput } from './input/create-model.input';
import { ModelDomainValidationException } from '../../../../domain/exceptions';

@Injectable()
export class CreateModelService implements ICreateModelUseCase {
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
      if (error instanceof ModelDomainValidationException) {
        throw new UnprocessableEntityException({
          message: error.message,
          errors: error.errors,
        });
      }
      throw error;
    }
  }
}
