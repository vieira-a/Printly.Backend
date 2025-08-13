import { FindPrinterOutput } from './output/find-printer.output';

export interface IFindPrinterUseCase {
  execute(): Promise<FindPrinterOutput[] | null>;
}
