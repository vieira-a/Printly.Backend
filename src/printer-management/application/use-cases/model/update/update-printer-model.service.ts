import { Inject, Injectable, InternalServerErrorException, Logger, UnprocessableEntityException } from '@nestjs/common';
import { IPrinterModelRepository } from '@printer/domain/data/repositories';
import { ModelDomainValidationException } from '@printer/domain/exceptions';
import { PrinterModelMapper } from '@printer/application/mappers/printer-model.mapper';
import { DatabaseModelException } from '@printer/application/exceptions';
import { ModelNotFoundException } from '@printer/application/exceptions/model-not-found.exception';
import { IUpdatePrinterModelUseCase } from './update-printer-model.interface';
import { UpdatePrinterModelInput } from './input/update-printer-model.input';
import { UpdatePrinterModelOutput } from './output/update-printer-model.output';

@Injectable()
export class UpdatePrinterModelService implements IUpdatePrinterModelUseCase {
  private readonly logger = new Logger(UpdatePrinterModelService.name);

  constructor(
    @Inject('IPrinterModelRepository')
    private readonly printerModelRepository: IPrinterModelRepository,
  ) {}
  async execute(id: string, input: UpdatePrinterModelInput): Promise<UpdatePrinterModelOutput | null> {
    try {
      const printerModel = await this.printerModelRepository.findById(id);

      if (!printerModel) throw new ModelNotFoundException(id);

      if (input.manufacturer) printerModel.updateManufacturer(input.manufacturer);
      if (input.description) printerModel.updateDescription(input.description);
      if (input.printOid) printerModel.updatePrintOid(input.printOid);
      if (input.copyOid) printerModel.updateCopyOid(input.copyOid);

      const updatedModel = await this.printerModelRepository.update(printerModel);

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
