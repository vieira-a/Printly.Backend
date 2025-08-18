import { CreatePrinterInput } from './input/create-printer.input';
import { PrinterOutput } from './output/printer.output';

export interface ICreatePrinterUseCase {
  execute(input: CreatePrinterInput): Promise<PrinterOutput>;
}
