import { ApplicationException } from '@shared/exceptions/application.exception';

export class ModelConflictException extends ApplicationException {
  constructor(
    public readonly manufacturer: string,
    public readonly description: string,
  ) {
    super(`Modelo com fabricante "${manufacturer}" e descrição "${description}" já existe.`);
  }
}
