import { CreatePrinterInput } from './input/create-printer.input';
import { CreatePrinterOutput } from './output/create-printer.output';

export interface ICreatePrinterUseCase {
  execute(input: CreatePrinterInput): Promise<CreatePrinterOutput>;
}
