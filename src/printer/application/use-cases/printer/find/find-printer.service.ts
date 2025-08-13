import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { IFindPrinterUseCase } from './find-printer.interface';
import { IPrinterRepository } from '@printer/domain/data/repositories';
import { DatabaseModelException } from '@printer/application/exceptions';
import { PrinterMapper } from '@printer/application/mappers/printer.mapper';
import type { FindPrinterOutput } from './output/find-printer.output';

@Injectable()
export class FindPrinterService implements IFindPrinterUseCase {
  private readonly logger = new Logger(FindPrinterService.name);

  constructor(
    @Inject('IPrinterRepository')
    private readonly printerRepository: IPrinterRepository,
  ) {}
  async execute(): Promise<FindPrinterOutput[] | null> {
    try {
      const printers = await this.printerRepository.findAll();
      return printers ? PrinterMapper.toOutputArray(printers) : null;
    } catch (error) {
      this.logger.log(error.message);
      if (error instanceof DatabaseModelException) {
        throw new InternalServerErrorException(error.message);
      }
      throw error;
    }
  }
}
