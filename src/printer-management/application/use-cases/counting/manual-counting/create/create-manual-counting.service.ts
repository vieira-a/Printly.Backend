import { Inject, Injectable, InternalServerErrorException, Logger, UnprocessableEntityException } from '@nestjs/common';
import { ICreateManualCounting } from './create-manual-counting.interface';
import { CountingJob } from '@printer/domain/entities/counting-job';
import { ICountingJobRepository } from '@printer/domain/data/repositories/counting-job.repository.interface';
import { CountingJobStatus } from '@printer/domain/enums/counting-job-status.enum';
import { CountingJobType } from '@printer/domain/enums/counting-job-type.enum';
import { CountingJobDomainValidationException } from '@printer/domain/exceptions';
import { IPrinterRepository, ICountingRepository } from '@printer/domain/data/repositories';
import { DatabaseModelException, PrinterNotFoundException } from '@printer/application/exceptions';
import { PrinterMapper } from '@printer/application/mappers/printer.mapper';
import { PrinterOutput } from '@printer/application/use-cases/printer/create/output/printer.output';

@Injectable()
export class CreateManualCountingService implements ICreateManualCounting {
  private readonly logger = new Logger(CreateManualCountingService.name);

  constructor(
    @Inject('IPrinterRepository')
    private readonly printerRepository: IPrinterRepository,
    @Inject('ICountingRepository')
    private readonly countingRepository: ICountingRepository,
    @Inject('ICountingJobRepository')
    private readonly countingJobRepository: ICountingJobRepository,
  ) {}
  async execute(id: string, prints: number, copies: number): Promise<PrinterOutput> {
    try {
      const printer = await this.printerRepository.findById(id);
      if (!printer) throw new PrinterNotFoundException(id);

      const newCountingJob = CountingJob.create({ printerId: printer.id, status: CountingJobStatus.SUCCESS });
      const savedCountingJob = await this.countingJobRepository.create(newCountingJob);

      const counting = printer.addCounting(savedCountingJob.id, CountingJobType.MANUAL, prints, copies, new Date());
      await this.countingRepository.create(counting);

      const updatedPrinter = await this.printerRepository.updateCounting(printer);
      return PrinterMapper.toOutput(updatedPrinter);
    } catch (error: unknown) {
      if (error instanceof Error) this.logger.log(error.message);
      if (error instanceof CountingJobDomainValidationException) {
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
