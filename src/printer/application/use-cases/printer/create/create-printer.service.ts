import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IPrinterRepository } from '@printer/domain/data/repositories/printer-repository.interface';
import { ICreatePrinterUseCase } from './create-printer.interface';
import { CreatePrinterInput } from './input/create-printer.input';
import { Model, Printer } from '@printer/domain/entities';
import { ILocationRepository, IModelRepository } from '@printer/domain/data/repositories';
import { IPV4 } from '@printer/domain/entities/value-objects/ipv4';
import {
  ModelNotFoundException,
  LocationNotFoundException,
  DatabaseModelException,
  PrinterConflictException,
} from '@printer/application/exceptions';
import { PrinterDomainValidationException } from '@printer/domain/exceptions/printer-domain-validation.exception';

@Injectable()
export class CreatePrinterService implements ICreatePrinterUseCase {
  private readonly logger = new Logger(CreatePrinterService.name);

  constructor(
    @Inject('IPrinterRepository')
    private readonly printerRepository: IPrinterRepository,
    @Inject('IModelRepository')
    private readonly modelRepository: IModelRepository,
    @Inject('ILocationRepository')
    private readonly locationRepository: ILocationRepository,
  ) {}
  async execute(input: CreatePrinterInput): Promise<any> {
    const { serialNumber, ipv4, modelId, locationId, installedAt } = input;

    try {
      const printerExists = await this.printerRepository.existsBySerialNumber(serialNumber);

      if (printerExists) throw new PrinterConflictException(serialNumber);

      const model = await this.modelRepository.findById(modelId);

      if (!model) throw new ModelNotFoundException(modelId);

      const domainModel = Model.restore(
        model.id,
        model.manufacturer,
        model.description,
        model.printOid,
        model.copyOid,
        model.createdAt,
        model.updatedAt,
      );

      const location = await this.locationRepository.findById(locationId);

      if (!location) throw new LocationNotFoundException(locationId);

      const newPrinter = Printer.create(
        domainModel,
        serialNumber,
        IPV4.create(ipv4),
        location,
        installedAt,
      );

      return await this.printerRepository.create(newPrinter);
    } catch (error) {
      this.logger.log(error.message);
      if (error instanceof PrinterDomainValidationException) {
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
