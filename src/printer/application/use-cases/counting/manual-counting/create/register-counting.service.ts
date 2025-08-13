import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { IRegisterCounting } from './register-counting.interface';
import { IPrinterRepository, ICountingRepository } from '@printer/domain/data/repositories';
import { DatabaseModelException, PrinterNotFoundException } from '@printer/application/exceptions';
import { PrinterMapper } from '@printer/application/mappers/printer.mapper';
import { UpdatePrinterOutput } from '../../../printer/update/output/update-printer.output';
import { CreateCountingJobInput } from '../../auto-counting/create/input/create-counting-job.input';
import { CountingJob } from '@printer/domain/entities/counting-job';
import { IPV4 } from '@printer/domain/entities/value-objects/ipv4';
import { ICountingJobRepository } from '@printer/domain/data/repositories/counting-job.repository.interface';
import { CountingJobStatus } from '@printer/domain/enums/counting-job-status.enum';
import { CountingType } from '@printer/domain/enums/counting-type.enum';

@Injectable()
export class RegisterCountingService implements IRegisterCounting {
  private readonly logger = new Logger(RegisterCountingService.name);

  constructor(
    @Inject('IPrinterRepository')
    private readonly printerRepository: IPrinterRepository,
    @Inject('ICountingRepository')
    private readonly countingRepository: ICountingRepository,
    @Inject('ICountingJobRepository')
    private readonly countingJobRepository: ICountingJobRepository,
  ) {}
  async execute(id: string, totalPrint: number, totalCopy: number): Promise<UpdatePrinterOutput> {
    const printer = await this.printerRepository.findById(id);

    if (!printer) throw new PrinterNotFoundException(id);
    const counting = printer.registerCounting(
      totalPrint,
      totalCopy,
      new Date(),
      CountingType.MANUAL,
    );

    const savedCounting = await this.countingRepository.create(counting);
    const updatedPrinter = await this.printerRepository.updateCounting(printer);

    await this.createCountingJob({
      printerId: printer.id,
      ipv4: printer.ipv4.toString(),
      status: CountingJobStatus.SUCCESS,
      countingId: savedCounting.id,
    });

    return PrinterMapper.toOutput(updatedPrinter);
  }

  private async createCountingJob(input: CreateCountingJobInput): Promise<void> {
    try {
      const countingJob = CountingJob.create(
        input.printerId,
        IPV4.create(input.ipv4),
        input.status,
        input.countingId,
        input.errorMessage,
      );
      await this.countingJobRepository.create(countingJob);
    } catch (error) {
      this.logger.log(error.message);
      if (error instanceof DatabaseModelException) {
        throw new InternalServerErrorException(error.message);
      }
      throw error;
    }
  }
}
