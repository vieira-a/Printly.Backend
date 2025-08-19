import { Inject, Injectable, InternalServerErrorException, Logger, UnprocessableEntityException } from '@nestjs/common';
import { PrinterModel } from '@printer/domain/entities';
import { IPrinterModelRepository } from '@printer/domain/data/repositories';
import { ModelDomainValidationException } from '@printer/domain/exceptions';
import { DatabaseModelException, ModelConflictException } from '@printer/application/exceptions';
import { ICreatePrinterModelUseCase } from './create-printer-model.interface';
import { CreatePrinterModelInput } from './input/create-printer-model.input';
import { CreatePrinterModelOutput } from './output/create-printer-model.output';
import { PrinterModelMapper } from '@printer/application/mappers/printer-model.mapper';

@Injectable()
export class CreatePrinterModelService implements ICreatePrinterModelUseCase {
  private readonly logger = new Logger(CreatePrinterModelService.name);

  constructor(
    @Inject('IPrinterModelRepository')
    private readonly printerModelRepository: IPrinterModelRepository,
  ) {}
  async execute(input: CreatePrinterModelInput): Promise<CreatePrinterModelOutput> {
    const { manufacturer, description, printOid, copyOid } = input;
    try {
      const newModel = PrinterModel.create({ manufacturer, description, printOid, copyOid });

      const printerModelAlreadyExists = await this.printerModelRepository.existsByManufacturerAndDesciption(
        manufacturer,
        description,
      );

      if (printerModelAlreadyExists) {
        throw new ModelConflictException(manufacturer, description);
      }

      const result = await this.printerModelRepository.create(newModel);
      return PrinterModelMapper.toOutput(result);
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
