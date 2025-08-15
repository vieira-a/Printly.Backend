const MissingCEPExceptionMessage = 'CEP não informado.';
const InvalidCEPExceptionMessage = 'CEP deve conter 8 digitos.';

export class CEP {
  private constructor(private readonly _value: string) {}

  public static create(raw: string): CEP {
    return new CEP(raw);
  }

  public get value(): string {
    return this._value;
  }

  public getFormatted(): string {
    return this._value.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }

  validate(): string[] {
    const errors: string[] = [];

    if (!this._value) errors.push(MissingCEPExceptionMessage);

    const cleaned = this._value?.replace(/\D/g, '');
    if (!/^\d{8}$/.test(cleaned)) errors.push(InvalidCEPExceptionMessage);

    return errors;
  }
}
