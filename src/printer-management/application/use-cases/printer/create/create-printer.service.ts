import { Inject, Injectable, InternalServerErrorException, Logger, UnprocessableEntityException } from '@nestjs/common';
import { IPrinterRepository } from '@printer/domain/data/repositories/printer-repository.interface';
import { ICreatePrinterUseCase } from './create-printer.interface';
import { CreatePrinterInput } from './input/create-printer.input';
import { IInstallationLocationRepository, IPrinterModelRepository } from '@printer/domain/data/repositories';
import { Printer } from '@printer/domain/entities';
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
    private readonly printerModelRepository: IPrinterModelRepository,
    @Inject('IInstallationLocationRepository')
    private readonly installationLocationRepository: IInstallationLocationRepository,
  ) {}
  async execute(input: CreatePrinterInput): Promise<any> {
    try {
      const printerExists = await this.printerRepository.existsBySerialNumber(input.serialNumber);
      if (printerExists) throw new PrinterConflictException(input.serialNumber);

      const printerModel = await this.printerModelRepository.existsById(input.modelId);
      if (!printerModel) throw new ModelNotFoundException(input.modelId);

      const installationLocation = await this.installationLocationRepository.existsById(input.installationLocationId);
      if (!installationLocation) throw new LocationNotFoundException(input.installationLocationId);

      const newPrinter = Printer.create({
        serialNumber: input.serialNumber,
        ipv4Address: IPV4.create(input.ipv4Address),
        modelId: input.modelId,
        installationLocationId: input.installationLocationId,
        installedAt: input.installedAt,
        totalPrint: input.totalPrint,
        totalCopy: input.totalCopy,
      });

      return await this.printerRepository.create(newPrinter);
    } catch (error: unknown) {
      if (error instanceof Error) this.logger.log(error.message);
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
