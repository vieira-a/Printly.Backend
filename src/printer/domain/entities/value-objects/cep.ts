const MissingCEPExceptionMessage = 'CEP não informado.';
const InvalidCEPExceptionMessage = 'CEP deve conter 8 digitos.';

export class CEP {
  private constructor(readonly value: string) {}

  static create(raw: string): CEP {
    return new CEP(raw);
  }

  public toString(): string {
    return this.value;
  }

  public getFormatted(): string {
    return this.value.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }

  validate(): string[] {
    const errors: string[] = [];

    if (!this.value) errors.push(MissingCEPExceptionMessage);

    const cleaned = this.value?.replace(/\D/g, '');
    if (!/^\d{8}$/.test(cleaned)) errors.push(InvalidCEPExceptionMessage);

    return errors;
  }
}
