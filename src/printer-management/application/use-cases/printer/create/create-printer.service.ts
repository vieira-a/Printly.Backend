import { Inject, Injectable, InternalServerErrorException, Logger, UnprocessableEntityException } from '@nestjs/common';
import { IPrinterRepository } from '@printer/domain/data/repositories/printer-repository.interface';
import { ICreatePrinterUseCase } from './create-printer.interface';
import { CreatePrinterInput } from './input/create-printer.input';
import { IInstallationLocationRepository, IPrinterModelRepository } from '@printer/domain/data/repositories';
import { Printer } from '@printer/domain/entities';
import { IPV4 } from '@printer/domain/entities/value-objects/ipv4';
import {
  ModelNotFoundException,
  InstallationLocationNotFoundException,
  DatabaseModelException,
  PrinterConflictException,
} from '@printer/application/exceptions';
import { PrinterDomainValidationException } from '@printer/domain/exceptions/printer-domain-validation.exception';
import { PrinterOutput } from './output/printer.output';
import { PrinterMapper } from '@printer/application/mappers/printer.mapper';

@Injectable()
export class CreatePrinterService implements ICreatePrinterUseCase {
  private readonly logger = new Logger(CreatePrinterService.name);

  constructor(
    @Inject('IPrinterRepository')
    private readonly printerRepository: IPrinterRepository,
    @Inject('IPrinterModelRepository')
    private readonly printerModelRepository: IPrinterModelRepository,
    @Inject('IInstallationLocationRepository')
    private readonly installationLocationRepository: IInstallationLocationRepository,
  ) {}
  async execute(input: CreatePrinterInput): Promise<PrinterOutput> {
    const { serialNumber, ipv4Address, modelId, installationLocationId, installedAt, totalPrint, totalCopy } = input;
    try {
      const printerExists = await this.printerRepository.existsBySerialNumber(input.serialNumber);
      if (printerExists) throw new PrinterConflictException(input.serialNumber);

      const printerModel = await this.printerModelRepository.existsById(input.modelId);
      if (!printerModel) throw new ModelNotFoundException(input.modelId);

      const installationLocation = await this.installationLocationRepository.existsById(input.installationLocationId);
      if (!installationLocation) throw new InstallationLocationNotFoundException(input.installationLocationId);

      const newPrinter = Printer.create({
        serialNumber,
        ipv4Address: IPV4.create(ipv4Address),
        modelId,
        installationLocationId,
        installedAt,
        totalPrint,
        totalCopy,
      });

      const createdPrinter = await this.printerRepository.create(newPrinter);
      return PrinterMapper.toOutput(createdPrinter);
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
