import { CepDomainValidationException } from '@printer/domain/exceptions';

const MissingCEPExceptionMessage = 'CEP não informado.';
const InvalidCEPExceptionMessage = 'CEP deve conter 8 digitos.';
const ValidationExceptionMessage = 'Ocorreram um ou mais erros de validação.';

export class CEP {
  private constructor(private readonly _value: string) {
    this.validate();
  }

  public static create(raw: string): CEP {
    return new CEP(raw);
  }

  public get value(): string {
    return this._value;
  }

  public getFormatted(): string {
    return this._value.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }

  private validate(): void {
    const errors: string[] = [];

    if (!this._value) errors.push(MissingCEPExceptionMessage);

    const cleaned = this._value?.replace(/\D/g, '');
    if (!/^\d{8}$/.test(cleaned)) errors.push(InvalidCEPExceptionMessage);

    if (errors.length > 0) throw new CepDomainValidationException(ValidationExceptionMessage, errors);
  }
}
