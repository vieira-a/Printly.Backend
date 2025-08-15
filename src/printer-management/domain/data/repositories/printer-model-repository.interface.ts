import type { PrinterModel } from '@printer/domain/entities';

export interface IPrinterModelRepository {
  create(input: PrinterModel): Promise<PrinterModel>;
  existsById(id: string): Promise<boolean>;
  existsByManufacturerAndDesciption(manufacturer: string, description: string): Promise<boolean>;
  findById(id: string): Promise<PrinterModel | null>;
  update(input: PrinterModel): Promise<PrinterModel | null>;
}
