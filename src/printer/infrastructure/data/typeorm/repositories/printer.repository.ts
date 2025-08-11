import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPrinterRepository } from '@printer/domain/data/repositories/printer-repository.interface';
import { Printer } from '@printer/domain/entities';
import { Repository } from 'typeorm';
import { PrinterModel } from '../models';
import { PrinterDataMapper } from '../../mappers/printer-data.mapper';

@Injectable()
export class PrinterRepository implements IPrinterRepository {
  constructor(
    @InjectRepository(PrinterModel)
    private readonly repository: Repository<PrinterModel>,
  ) {}
  async create(input: Printer): Promise<Partial<Printer>> {
    const newPrinter = PrinterModel.create(
      input.serial,
      input.ipv4.toString(),
      input.model.id,
      input.location.id,
      input.installedAt,
    );

    const savedPrinter = await this.repository.save(newPrinter);

    const savedWithRelations = await this.repository.findOne({
      where: { id: savedPrinter.id },
      relations: ['model', 'location'], // nomes dos campos no ORM entity
    });
    return PrinterDataMapper.toDomain(savedWithRelations!);
  }
}
