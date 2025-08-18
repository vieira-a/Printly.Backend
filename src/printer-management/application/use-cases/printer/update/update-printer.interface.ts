import { UpdatePrinterInput } from './input/update-printer.input';
import { PrinterOutput } from '../create/output/printer.output';

export interface IUpdatePrinterUseCase {
  execute(id: string, input: UpdatePrinterInput): Promise<PrinterOutput>;
}
