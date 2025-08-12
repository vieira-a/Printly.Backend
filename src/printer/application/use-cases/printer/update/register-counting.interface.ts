import { UpdatePrinterOutput } from './output/update-printer.output';

export interface IRegisterCounting {
  execute(id: string, totalPrint: number, totalCopy: number): Promise<UpdatePrinterOutput>;
}
