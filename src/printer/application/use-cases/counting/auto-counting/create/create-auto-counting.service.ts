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
  ) {}
  async execute(id: string): Promise<void> {
    try {
      const printer = await this.printerRepository.findById(id);

      if (!printer) throw new PrinterNotFoundException(id);

      const printerIpv4 = printer.ipv4.toString();
      const printerOidPrint = printer.model.printOid;
      const printerOidCopy = printer.model.copyOid;

      const totalPrint = await this.autoCounting.collect(printerIpv4, printerOidPrint);
      const totalCopy = await this.autoCounting.collect(printerIpv4, printerOidCopy);

      const counting = printer.registerCounting(Number(totalPrint), Number(totalCopy), new Date());
      await this.countingRepository.create(counting);
      await this.printerRepository.updateCounting(printer);
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
