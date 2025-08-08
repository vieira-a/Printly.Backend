import { DomainException } from './domain.exception';

export class DomainValidationException extends DomainException {
  public errors: string[];
  constructor(message: string, errors: string[]) {
    super(message);
    this.errors = errors;
  }
}
