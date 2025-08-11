import { Printer } from '@printer/domain/entities';

export interface IPrinterRepository {
  create(input: Printer): Promise<Partial<Printer>>;
}
