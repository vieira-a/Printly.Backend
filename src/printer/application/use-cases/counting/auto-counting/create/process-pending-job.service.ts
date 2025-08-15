import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IProcessPendingJobUseCase } from './pocess-pending-job.interface';
import { ICountingJobRepository } from '@printer/domain/data/repositories/counting-job.repository.interface';
import { ICountingRepository, IPrinterRepository } from '@printer/domain/data/repositories';
import { CountingType } from '@printer/domain/enums/counting-type.enum';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IAutoCounting } from '@printer/domain/interfaces/auto-counting.interface';
import { Printer } from '@printer/domain/entities';
import { DatabaseModelException } from '@printer/application/exceptions';
import { PrinterDomainValidationException } from '@printer/domain/exceptions/printer-domain-validation.exception';
import { CountingDomainValidationException } from '@printer/domain/exceptions';
import { RequestTimedOutError } from '@shared/exceptions/request-timeout.exception';
import { RequestPrinterTimeoutException } from '@shared/exceptions/request-printer-timeout.exception';

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
          const ipv4 = job.printer.ipv4.toString();
          const printOid = job.printer.model.printOid;
          const copyOid = job.printer.model.copyOid;

          const totalPrintResult = await this.autoCounting.collect(ipv4, printOid);
          const totalCopyResult = await this.autoCounting.collect(ipv4, copyOid);

          if (totalPrintResult.success && totalCopyResult.success) {
            const updatedCounting = await this.registerPrinterCounting(
              job.printer,
              Number(totalPrintResult.count),
              Number(totalCopyResult.count),
            );

            job.markSuccess(updatedCounting.id);
            await this.countingJobRepository.updateStatus(job);
          }
        }
      }
    } catch (error) {
      this.logger.log(error.message);
      throw error;
    }
  }

  private async registerPrinterCounting(
    printer: Printer,
    totalPrint: number,
    totalCopy: number,
  ): Promise<any> {
    try {
      const counting = printer.registerCounting(
        totalPrint,
        totalCopy,
        new Date(),
        CountingType.AUTO,
      );

      const createdCounting = await this.countingRepository.create(counting);

      await this.printerRepository.updateCounting(printer);
      return createdCounting;
    } catch (error) {
      this.logger.log(error.message);
      if (
        error instanceof PrinterDomainValidationException ||
        error instanceof CountingDomainValidationException
      ) {
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
