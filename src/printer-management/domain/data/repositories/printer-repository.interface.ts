import { Printer } from '@printer/domain/entities';

export interface IPrinterRepository {
  create(input: Printer): Promise<Printer>;
  existsBySerialNumber(serial: string): Promise<boolean>;
  findById(id: string): Promise<Printer | null>;
  update(input: Printer): Promise<Printer>;
  updateCounting(input: Printer): Promise<Printer>;
  findAll(): Promise<Printer[] | null>;
}
