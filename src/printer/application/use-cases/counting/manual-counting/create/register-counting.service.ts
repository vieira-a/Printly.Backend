import { Inject, Injectable } from '@nestjs/common';
import { IRegisterCounting } from './register-counting.interface';
import { IPrinterRepository, ICountingRepository } from '@printer/domain/data/repositories';
import { PrinterNotFoundException } from '@printer/application/exceptions';
import { PrinterMapper } from '@printer/application/mappers/printer.mapper';
import { UpdatePrinterOutput } from '../../../printer/update/output/update-printer.output';

@Injectable()
export class RegisterCountingService implements IRegisterCounting {
  constructor(
    @Inject('IPrinterRepository')
    private readonly printerRepository: IPrinterRepository,
    @Inject('ICountingRepository')
    private readonly countingRepository: ICountingRepository,
  ) {}
  async execute(id: string, totalPrint: number, totalCopy: number): Promise<UpdatePrinterOutput> {
    const printer = await this.printerRepository.findById(id);

    if (!printer) throw new PrinterNotFoundException(id);
    const counting = printer.registerCounting(totalPrint, totalCopy, new Date());

    await this.countingRepository.create(counting);
    const updatedPrinter = await this.printerRepository.updateCounting(printer);
    return PrinterMapper.toOutput(updatedPrinter);
  }
}
