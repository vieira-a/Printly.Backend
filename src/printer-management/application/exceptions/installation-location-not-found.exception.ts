import { ApplicationException } from '@shared/exceptions/application.exception';

export class InstallationLocationNotFoundException extends ApplicationException {
  constructor(public readonly id: string) {
    super(`Localização com ID "${id}" não encontrada.`);
  }
}
