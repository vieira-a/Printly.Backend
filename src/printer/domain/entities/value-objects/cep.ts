import { CepDomainValidationException } from '../../exceptions';

const MissingCEPExceptionMessage = 'CEP não informado.';
const InvalidCEPExceptionMessage = 'CEP deve conter 8 digitos.';
const ValidationExceptionMessage = 'Ocorreram um ou mais erros de validação.';

export class CEP {
  private constructor(readonly value: string) {}

  static create(raw: string): CEP {
    const errors: string[] = [];

    if (!raw) errors.push(MissingCEPExceptionMessage);

    const cleaned = raw?.replace(/\D/g, '');

    if (!/^\d{8}$/.test(cleaned)) errors.push(InvalidCEPExceptionMessage);

    if (errors.length > 0)
      throw new CepDomainValidationException(ValidationExceptionMessage, errors);

    return new CEP(cleaned);
  }

  public toString(): string {
    return this.value;
  }

  public getFormatted(): string {
    return this.value.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }
}
