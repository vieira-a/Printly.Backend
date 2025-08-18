import { PrinterOutput } from '@printer/application/use-cases/printer/create/output/printer.output';

export interface ICreateManualCounting {
  execute(id: string, totalPrint: number, totalCopy: number): Promise<PrinterOutput>;
}
