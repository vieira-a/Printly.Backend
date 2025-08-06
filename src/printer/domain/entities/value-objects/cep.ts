import { InvalidParamException, MissingParamException } from '../../exceptions';

const MissingCEPExceptionMessage = 'CEP não informado.';
const InvalidCEPExceptionMessage = 'CEP deve conter 8 digitos.';

export class CEP {
  private constructor(readonly value: string) {}

  static create(raw: string): CEP {
    if (!raw) throw new MissingParamException(MissingCEPExceptionMessage);

    const cleaned = raw.replace(/\D/g, '');

    if (!/^\d{8}$/.test(cleaned)) {
      throw new InvalidParamException(InvalidCEPExceptionMessage);
    }

    return new CEP(cleaned);
  }

  public toString(): string {
    return this.value;
  }

  public getFormatted(): string {
    return this.value.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }
}
