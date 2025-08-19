import { Inject, Injectable, Logger } from '@nestjs/common';
import { IProcessAutoCountingUseCase } from './process-auto-counting.interface';
import { IPrinterRepository } from '@printer/domain/data/repositories';
import { CreateAutoCountingService } from '../create/create-auto-counting.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ProcessAutoCountingService implements IProcessAutoCountingUseCase {
  private readonly logger = new Logger(ProcessAutoCountingService.name);

  constructor(
    @Inject('IPrinterRepository')
    private readonly printerRepository: IPrinterRepository,
    private readonly createAutoCountingService: CreateAutoCountingService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_11AM, { timeZone: 'America/Sao_Paulo' })
  async execute(): Promise<void> {
    const printers = await this.printerRepository.findAll();

    if (!printers) return;
    for (const printer of printers) {
      try {
        await this.createAutoCountingService.execute(printer);
      } catch (error: unknown) {
        if (error instanceof Error)
          this.logger.log(
            `Erro ao processar contagem da impressora: [${printer.model?.manufacturer} ${printer.model?.description}] - [${printer.ipv4Address.toString()}] - Erro: [${error.message}]`,
          );
        throw error;
      }
    }
  }
}
