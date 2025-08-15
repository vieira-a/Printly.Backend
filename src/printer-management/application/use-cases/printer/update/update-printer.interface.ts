import { UpdatePrinterInput } from './input/update-printer.input';
import { UpdatePrinterOutput } from './output/update-printer.output';

export interface IUpdatePrinterUseCase {
  execute(id: string, input: UpdatePrinterInput): Promise<UpdatePrinterOutput>;
}
