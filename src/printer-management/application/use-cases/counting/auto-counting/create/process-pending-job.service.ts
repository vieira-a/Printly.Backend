import { Inject, Injectable, InternalServerErrorException, Logger, UnprocessableEntityException } from '@nestjs/common';
import { IProcessPendingJobUseCase } from './pocess-pending-job.interface';
import { ICountingJobRepository } from '@printer/domain/data/repositories/counting-job.repository.interface';
import { ICountingRepository, IPrinterRepository } from '@printer/domain/data/repositories';
import { CountingJobType } from '@printer/domain/enums/counting-job-type.enum';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IAutoCounting } from '@printer/domain/interfaces/auto-counting.interface';
import { Printer } from '@printer/domain/entities';
import { DatabaseModelException } from '@printer/application/exceptions';
import { PrinterDomainValidationException } from '@printer/domain/exceptions/printer-domain-validation.exception';
import { CountingDomainValidationException } from '@printer/domain/exceptions';
import { RequestTimedOutError } from '@shared/exceptions/request-timeout.exception';
import { RequestPrinterTimeoutException } from '@shared/exceptions/request-printer-timeout.exception';
import { CountingJob } from '@printer/domain/entities/counting-job';
import { CountingJobStatus } from '@printer/domain/enums/counting-job-status.enum';

@Injectable()
export class ProcessPendingJobService implements IProcessPendingJobUseCase {
  private readonly logger = new Logger(ProcessPendingJobService.name);

  constructor(
    @Inject('ICountingJobRepository')
    private readonly countingJobRepository: ICountingJobRepository,
    @Inject('IPrinterRepository')
    private readonly printerRepository: IPrinterRepository,
    @Inject('ICountingRepository')
    private readonly countingRepository: ICountingRepository,
    @Inject('IAutoCounting')
    private readonly autoCounting: IAutoCounting,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async execute(): Promise<void> {
    try {
      const pendingJobs = await this.countingJobRepository.findFailedOrPending();

      if (!pendingJobs) {
        return;
      }

      for (const job of pendingJobs) {
        if (!job.canRetry()) continue;

        job.registerAttempt();
        await this.countingJobRepository.updateStatus(job);

        if (job.printer) {
          const ipv4Address = job.printer.ipv4Address.toString();
          const printOid = job.printer.model?.printOid;
          const copyOid = job.printer.model?.copyOid;

          const totalPrintResult = await this.autoCounting.collect(ipv4Address, printOid!);
          const totalCopyResult = await this.autoCounting.collect(ipv4Address, copyOid!);

          if (totalPrintResult.success && totalCopyResult.success) {
            await this.registerPrinterCounting(
              job.printer,
              Number(totalPrintResult.count),
              Number(totalCopyResult.count),
            );

            job.markSuccess();
            await this.countingJobRepository.updateStatus(job);
          }
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) this.logger.log(error.message);
      throw error;
    }
  }

  private async registerPrinterCounting(printer: Printer, prints: number, copies: number): Promise<void> {
    try {
      const newCountingJob = CountingJob.create({ printerId: printer.id, status: CountingJobStatus.PENDING });
      const counting = printer.addCounting(newCountingJob.id, CountingJobType.AUTO, prints, copies, new Date());

      await this.countingRepository.create(counting);

      await this.printerRepository.updateCounting(printer);
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
