import { UpdatePrinterModelInput } from './input/update-printer-model.input';
import { UpdatePrinterModelOutput } from './output/update-printer-model.output';

export interface IUpdatePrinterModelUseCase {
  execute(id: string, input: UpdatePrinterModelInput): Promise<UpdatePrinterModelOutput | null>;
}
