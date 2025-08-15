import { Printer } from '@printer/domain/entities';

export interface ICreateAutoCountingUseCase {
  execute(printer: Partial<Printer>): Promise<void>;
}
