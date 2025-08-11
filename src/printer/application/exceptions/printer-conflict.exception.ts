import { ApplicationException } from '@shared/exceptions/application.exception';

export class PrinterConflictException extends ApplicationException {
  constructor(public readonly serial: string) {
    super(`Impressora com número de série "${serial}" já existe.`);
  }
}
