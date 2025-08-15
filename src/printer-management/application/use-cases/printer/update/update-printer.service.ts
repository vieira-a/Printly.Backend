import { Inject, Injectable, InternalServerErrorException, Logger, UnprocessableEntityException } from '@nestjs/common';
import { IUpdatePrinterUseCase } from './update-printer.interface';
import { UpdatePrinterInput } from './input/update-printer.input';
import { UpdatePrinterOutput } from './output/update-printer.output';
import { IPrinterRepository } from '@printer/domain/data/repositories/printer-repository.interface';
import { PrinterDomainValidationException } from '@printer/domain/exceptions/printer-domain-validation.exception';
import { DatabaseModelException, PrinterNotFoundException } from '@printer/application/exceptions';
import { PrinterMapper } from '@printer/application/mappers/printer.mapper';

@Injectable()
export class UpdatePrinterService implements IUpdatePrinterUseCase {
  private readonly logger = new Logger(UpdatePrinterService.name);

  constructor(
    @Inject('IPrinterRepository')
    private readonly printerRepository: IPrinterRepository,
  ) {}
  async execute(id: string, input: UpdatePrinterInput): Promise<UpdatePrinterOutput> {
    try {
      const printer = await this.printerRepository.findById(id);
      if (!printer) throw new PrinterNotFoundException(id);

      if (input.serialNumber) printer.updateSerialNumber(input.serialNumber);
      if (input.ipv4Address) printer.updateSerialNumber(input.ipv4Address);

      const updatedPrinter = await this.printerRepository.update(printer);
      return PrinterMapper.toOutput(updatedPrinter);
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
