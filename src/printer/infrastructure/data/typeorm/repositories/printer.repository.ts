import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPrinterRepository } from '@printer/domain/data/repositories/printer-repository.interface';
import { Printer } from '@printer/domain/entities';
import { Repository, TypeORMError } from 'typeorm';
import { PrinterModel } from '../models';
import { PrinterDataMapper } from '../../mappers/printer-data.mapper';
import { DatabaseModelException } from '@printer/application/exceptions';
import { InfrastructureException } from '@shared/exceptions';

const DatabaseModelExceptionMessage =
  'Houve um erro no banco de dados relacionado ao modelo de impressora.';
const InfrastructureExceptionMessage = 'Houve um erro interno. Tente novamente mais tarde.';

@Injectable()
export class PrinterRepository implements IPrinterRepository {
  private readonly logger = new Logger(PrinterRepository.name);

  constructor(
    @InjectRepository(PrinterModel)
    private readonly repository: Repository<PrinterModel>,
  ) {}
  async create(input: Printer): Promise<Partial<Printer>> {
    try {
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
        relations: ['model', 'location'],
      });
      return PrinterDataMapper.toDomain(savedWithRelations!);
    } catch (error) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      } else {
        this.logger.log(error.message);
        throw new InfrastructureException(InfrastructureExceptionMessage);
      }
    }
  }

  async existsBySerialNumber(serial: string): Promise<boolean> {
    try {
      const printer = await this.repository.findOneBy({ sn: serial });
      return printer ? true : false;
    } catch (error) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      } else {
        this.logger.log(error.message);
        throw new InfrastructureException(InfrastructureExceptionMessage);
      }
    }
  }

  async findById(id: string): Promise<Printer | null> {
    try {
      const printer = await this.repository.findOne({
        where: { id },
        relations: ['model', 'location'],
      });
      return printer ? PrinterDataMapper.toDomain(printer) : null;
    } catch (error) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      } else {
        this.logger.log(error.message);
        throw new InfrastructureException(InfrastructureExceptionMessage);
      }
    }
  }

  async update(input: Printer): Promise<Printer> {
    try {
      await this.repository.update(input.id, {
        sn: input.serial,
        ipv4: input.ipv4.toString(),
      });

      const updatedPrinter = await this.repository.findOne({
        where: { id: input.id },
        relations: ['model', 'location'],
      });

      return PrinterDataMapper.toDomain(updatedPrinter!);
    } catch (error) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      } else {
        this.logger.log(error.message);
        throw new InfrastructureException(InfrastructureExceptionMessage);
      }
    }
  }

  async updateCounting(input: Printer): Promise<Printer> {
    try {
      await this.repository.update(input.id, {
        totalPrint: input.totalPrint,
        totalCopy: input.totalCopy,
      });

      const updatedPrinter = await this.repository.findOne({
        where: { id: input.id },
        relations: ['model', 'location'],
      });

      return PrinterDataMapper.toDomain(updatedPrinter!);
    } catch (error) {
      if (error instanceof TypeORMError) {
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      } else {
        this.logger.log(error.message);
        throw new InfrastructureException(InfrastructureExceptionMessage);
      }
    }
  }

  async findAll(): Promise<Printer[] | null> {
    try {
      const printers = await this.repository.find({ relations: ['model', 'location'] });
      return printers ? PrinterDataMapper.toDomainArray(printers) : null;
    } catch (error) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      } else {
        this.logger.log(error.message);
        throw new InfrastructureException(InfrastructureExceptionMessage);
      }
    }
  }
}
