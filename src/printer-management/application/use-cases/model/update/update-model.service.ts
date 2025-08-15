import { Inject, Injectable, InternalServerErrorException, Logger, UnprocessableEntityException } from '@nestjs/common';
import { IPrinterModelRepository } from '@printer/domain/data/repositories';
import { ModelDomainValidationException } from '@printer/domain/exceptions';
import { PrinterModelMapper } from '@printer/application/mappers/printer-model.mapper';
import { DatabaseModelException } from '@printer/application/exceptions';
import { ModelNotFoundException } from '@printer/application/exceptions/model-not-found.exception';
import { IUpdateModelUseCase } from './update-model.interface';
import { UpdateModelInput } from './input/update-model.input';
import { UpdateModelOutput } from './output/update-model.output';

@Injectable()
export class UpdateModelService implements IUpdateModelUseCase {
  private readonly logger = new Logger(UpdateModelService.name);

  constructor(
    @Inject('IPrinterModelRepository')
    private readonly printerMmodelRepository: IPrinterModelRepository,
  ) {}
  async execute(id: string, input: UpdateModelInput): Promise<UpdateModelOutput | null> {
    try {
      const printerModel = await this.printerMmodelRepository.findById(id);

      if (!printerModel) throw new ModelNotFoundException(id);

      if (input.manufacturer) printerModel.updateManufacturer(input.manufacturer);
      if (input.description) printerModel.updateDescription(input.description);
      if (input.printOid) printerModel.updatePrintOid(input.printOid);
      if (input.copyOid) printerModel.updateCopyOid(input.copyOid);

      const updatedModel = await this.printerMmodelRepository.update(printerModel);

      return updatedModel ? PrinterModelMapper.toOutput(updatedModel) : null;
    } catch (error: unknown) {
      if (error instanceof Error) this.logger.log(error.message);
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
