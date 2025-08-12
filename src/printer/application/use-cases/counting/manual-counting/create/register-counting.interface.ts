import { UpdatePrinterOutput } from '../../../printer/update/output/update-printer.output';

export interface IRegisterCounting {
  execute(id: string, totalPrint: number, totalCopy: number): Promise<UpdatePrinterOutput>;
}
