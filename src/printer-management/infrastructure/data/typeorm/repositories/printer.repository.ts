import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { IPrinterRepository } from '@printer/domain/data/repositories/printer-repository.interface';
import { Printer } from '@printer/domain/entities';
import { DatabaseModelException } from '@printer/application/exceptions';
import { PrinterEntity } from '../models';
import { PrinterDataMapper } from '../../mappers/printer-data.mapper';
import { InfrastructureException } from '@shared/exceptions';

const DatabaseModelExceptionMessage = 'Houve um erro no banco de dados relacionado ao modelo de impressora.';
const InfrastructureExceptionMessage = 'Houve um erro interno. Tente novamente mais tarde.';

@Injectable()
export class PrinterRepository implements IPrinterRepository {
  private readonly logger = new Logger(PrinterRepository.name);

  constructor(
    @InjectRepository(PrinterEntity)
    private readonly repository: Repository<PrinterEntity>,
  ) {}
  async create(input: Printer): Promise<any> {
    try {
      const newPrinter = PrinterEntity.create({
        serialNumber: input.serialNumber,
        ipv4Address: input.ipv4Address.toString(),
        modelId: input.modelId,
        installationLocationId: input.installationLocationId,
        installedAt: input.installedAt,
        totalPrint: input.totalPrint,
        totalCopy: input.totalCopy,
      });

      const savedPrinter = await this.repository.save(newPrinter);

      const savedWithRelations = await this.repository.findOne({
        where: { id: savedPrinter.id },
        relations: ['model', 'installationLocation'],
      });
      return PrinterDataMapper.toDomain(savedWithRelations!);
    } catch (error: unknown) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      } else if (error instanceof Error) {
        this.logger.log(error.message);
        throw new InfrastructureException(InfrastructureExceptionMessage);
      }
    }
  }

  async existsBySerialNumber(serialNumber: string): Promise<boolean> {
    try {
      const printer = await this.repository.findOneBy({ serialNumber: serialNumber });
      return printer ? true : false;
    } catch (error: unknown) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      }
      if (error instanceof Error) {
        this.logger.log(error.message);
      }
      throw new InfrastructureException(InfrastructureExceptionMessage);
    }
  }

  async findById(id: string): Promise<Printer | null> {
    try {
      const printer = await this.repository.findOne({ where: { id } });
      return printer ? PrinterDataMapper.toDomain(printer) : null;
    } catch (error: unknown) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      }
      if (error instanceof Error) {
        this.logger.log(error.message);
      }
      throw new InfrastructureException(InfrastructureExceptionMessage);
    }
  }

  async update(input: Printer): Promise<Printer> {
    try {
      const printerToUpdate = PrinterDataMapper.toEntity(input);
      await this.repository.update(input.id, { ...printerToUpdate });

      const updatedPrinter = await this.repository.findOne({
        where: { id: input.id },
        relations: ['model', 'installationLocation'],
      });

      return PrinterDataMapper.toDomain(updatedPrinter!);
    } catch (error: unknown) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      }
      if (error instanceof Error) {
        this.logger.log(error.message);
      }
      throw new InfrastructureException(InfrastructureExceptionMessage);
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
        relations: ['model', 'installationLocation'],
      });

      return PrinterDataMapper.toDomain(updatedPrinter!);
    } catch (error: unknown) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      }
      if (error instanceof Error) {
        this.logger.log(error.message);
      }
      throw new InfrastructureException(InfrastructureExceptionMessage);
    }
  }

  async findAll(): Promise<Printer[] | null> {
    try {
      const printers = await this.repository.find({
        relations: ['model', 'installationLocation'],
      });

      return printers ? PrinterDataMapper.toDomainArray(printers) : null;
    } catch (error: unknown) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      }
      if (error instanceof Error) {
        this.logger.log(error.message);
      }
      throw new InfrastructureException(InfrastructureExceptionMessage);
    }
  }
}
