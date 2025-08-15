import { ApplicationException } from '@shared/exceptions/application.exception';

export class LocationNotFoundException extends ApplicationException {
  constructor(public readonly id: string) {
    super(`Localização com ID "${id}" não encontrada.`);
  }
}
