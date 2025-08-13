import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ICreateAutoCountingUseCase } from './create-auto-counting.interface';
import { IAutoCounting } from '@printer/domain/interfaces/auto-counting.interface';
import { ICountingRepository, IPrinterRepository } from '@printer/domain/data/repositories';
import { DatabaseModelException, PrinterNotFoundException } from '@printer/application/exceptions';
import { PrinterDomainValidationException } from '@printer/domain/exceptions/printer-domain-validation.exception';
import { CountingDomainValidationException } from '@printer/domain/exceptions';
import { RequestPrinterTimeoutException } from '@shared/exceptions/request-printer-timeout.exception';
import { RequestTimedOutError } from '@shared/exceptions/request-timeout.exception';
import { ICountingJobRepository } from '@printer/domain/data/repositories/counting-job.repository.interface';
import { CreateCountingJobInput } from '@printer/application/use-cases/counting/auto-counting/create/input/create-counting-job.input';
import { CountingJob, CountingJobStatus } from '@printer/domain/entities/counting-job';
import { IPV4 } from '@printer/domain/entities/value-objects/ipv4';
import { Printer } from '@printer/domain/entities';

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
      const ipv4 = printer.ipv4.toString();
      const printOid = printer.model.printOid;
      const copyOid = printer.model.copyOid;

      const totalPrintResult = await this.autoCounting.collect(ipv4, printOid);
      const totalCopyResult = await this.autoCounting.collect(ipv4, copyOid);

      if (totalPrintResult.success && totalPrintResult.success) {
        const counting = printer.registerCounting(
          Number(totalPrintResult.count),
          Number(totalCopyResult.count),
          new Date(),
        );

        await this.countingRepository.create(counting);

        await this.printerRepository.updateCounting(printer);

        await this.createCountingJob({
          printerId: printer.id,
          ipv4: printer.ipv4.toString(),
          status: CountingJobStatus.SUCCESS,
        });
      } else {
        await this.createCountingJob({
          printerId: printer.id,
          ipv4: printer.ipv4.toString(),
          status: CountingJobStatus.FAILED,
          errorMessage: totalPrintResult.error,
        });
      }
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

  private async createCountingJob(input: CreateCountingJobInput): Promise<void> {
    try {
      const countingJob = CountingJob.create(
        input.printerId,
        IPV4.create(input.ipv4),
        input.status,
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
