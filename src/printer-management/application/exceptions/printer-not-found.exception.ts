import { ApplicationException } from '@shared/exceptions/application.exception';

export class PrinterNotFoundException extends ApplicationException {
  constructor(public readonly id: string) {
    super(`Impressora com ID "${id}" não encontrada.`);
  }
}
