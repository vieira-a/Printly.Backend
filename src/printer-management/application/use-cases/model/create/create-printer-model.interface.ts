import { CreatePrinterModelInput } from './input/create-printer-model.input';
import { CreatePrinterModelOutput } from './output/create-printer-model.output';

export interface ICreatePrinterModelUseCase {
  execute(input: CreatePrinterModelInput): Promise<CreatePrinterModelOutput>;
}
