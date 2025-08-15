import { ApplicationException } from '@shared/exceptions/application.exception';

export class ModelNotFoundException extends ApplicationException {
  constructor(public readonly id: string) {
    super(`Modelo com ID "${id}" não encontrado.`);
  }
}
