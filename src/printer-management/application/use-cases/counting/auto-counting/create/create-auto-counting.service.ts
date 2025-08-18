import { Inject, Injectable, InternalServerErrorException, Logger, UnprocessableEntityException } from '@nestjs/common';
import { ICreateAutoCountingUseCase } from './create-auto-counting.interface';
import { IAutoCounting } from '@printer/domain/interfaces/auto-counting.interface';
import { ICountingRepository, IPrinterRepository } from '@printer/domain/data/repositories';
import { DatabaseModelException } from '@printer/application/exceptions';
import { PrinterDomainValidationException } from '@printer/domain/exceptions/printer-domain-validation.exception';
import { CountingDomainValidationException } from '@printer/domain/exceptions';
import { RequestPrinterTimeoutException } from '@shared/exceptions/request-printer-timeout.exception';
import { RequestTimedOutError } from '@shared/exceptions/request-timeout.exception';
import { ICountingJobRepository } from '@printer/domain/data/repositories/counting-job.repository.interface';
import { CountingJob } from '@printer/domain/entities/counting-job';
import { Printer } from '@printer/domain/entities';
import { CountingJobStatus } from '@printer/domain/enums/counting-job-status.enum';
import { CountingJobType } from '@printer/domain/enums/counting-job-type.enum';

@Injectable()
export class CreateAutoCountingService implements ICreateAutoCountingUseCase {
  private readonly logger = new Logger(CreateAutoCountingService.name);

  constructor(
    @Inject('IAutoCounting')
    private readonly autoCounting: IAutoCounting,
    @Inject('IPrinterRepository')
    private readonly printerRepository: IPrinterRepository,
    @Inject('ICountingRepository')
    private readonly countingRepository: ICountingRepository,
    @Inject('ICountingJobRepository')
    private readonly countingJobRepository: ICountingJobRepository,
  ) {}
  async execute(printer: Printer): Promise<void> {
    try {
      const ipv4Address = printer.ipv4Address.toString();
      const printOid = printer.model?.printOid;
      const copyOid = printer.model?.copyOid;

      const totalPrintResult = await this.autoCounting.collect(ipv4Address, printOid!);
      const totalCopyResult = await this.autoCounting.collect(ipv4Address, copyOid!);

      if (totalPrintResult.success && totalPrintResult.success) {
        const newCountingJob = CountingJob.create({ printerId: printer.id, status: CountingJobStatus.SUCCESS });
        const savedCountingJob = await this.countingJobRepository.create(newCountingJob);

        const counting = printer.addCounting(
          savedCountingJob.id,
          CountingJobType.AUTO,
          Number(totalPrintResult.count),
          Number(totalCopyResult.count),
          new Date(),
        );

        await this.countingRepository.create(counting);
        await this.printerRepository.updateCounting(printer);
      } else {
        const newCountingJob = CountingJob.create({ printerId: printer.id, status: CountingJobStatus.FAILED });
        await this.countingJobRepository.create(newCountingJob);
      }
    } catch (error: unknown) {
      if (error instanceof Error) this.logger.log(error.message);
      if (error instanceof PrinterDomainValidationException || error instanceof CountingDomainValidationException) {
        throw new UnprocessableEntityException({ message: error.message, errors: error.errors });
      } else if (error instanceof RequestTimedOutError) {
        throw new RequestPrinterTimeoutException(error.message, error.ipv4);
      } else if (error instanceof DatabaseModelException) {
        throw new InternalServerErrorException(error.message);
      }
      throw error;
    }
  }
}
