import { Inject, Injectable, Logger } from '@nestjs/common';
import { IProcessAutoCountingUseCase } from './process-auto-counting.interface';
import { IPrinterRepository } from '@printer/domain/data/repositories';
import { CreateAutoCountingService } from '../create/create-auto-counting.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ProcessAutoCountingService implements IProcessAutoCountingUseCase {
  private readonly logger = new Logger(ProcessAutoCountingService.name);

  constructor(
    @Inject('IPrinterRepository')
    private readonly printerRepository: IPrinterRepository,
    private readonly createAutoCountingService: CreateAutoCountingService,
  ) {}

  //@Cron('*/1 * * * *')
  async execute(): Promise<void> {
    this.logger.log('Obtendo dados das impressoras');
    const printers = await this.printerRepository.findAll();

    if (!printers) return;
    for (const printer of printers) {
      try {
        this.logger.log(
          `Processando contagem da impressora: [${printer.model.manufacturer} ${printer.model.description}] - [${printer.ipv4.toString()}]`,
        );
        await this.createAutoCountingService.execute(printer);
      } catch (error) {
        this.logger.log(
          `Erro ao processar contagem da impressora: [${printer.model.manufacturer} ${printer.model.description}] - [${printer.ipv4.toString()}] - Erro: [${error.message}]`,
        );
      }
    }
  }
}
