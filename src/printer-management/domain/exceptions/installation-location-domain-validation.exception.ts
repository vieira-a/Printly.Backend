import { DomainException } from '@shared/exceptions/domain.exception';

export class InstallationLocationDomainValidationException extends DomainException {
  public errors: string[];

  constructor(message: string, errors: string[]) {
    super(message);
    this.errors = errors;
  }
}
