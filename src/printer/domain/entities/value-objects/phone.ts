const InvalidDDDExceptionMessage = 'DDD deve conter dois dígitos entre 11 e 99.';
const InvalidPhoneExceptionMessage = 'Número de telefone deve conter 8 ou 9 digitos.';
const InvalidCellPhoneExceptionMessage = 'Número de celular com 9 dígitos deve começar com 9.';
const InvalidFixedPhoneExceptionMessage = 'Número fixo com 8 dígitos não deve começar com 9.';

export class Phone {
  private constructor(
    private readonly _areaCode: number,
    private readonly _phoneNumber: number,
  ) {}

  public static create(areaCode: number | string, phoneNumber: number | string): Phone {
    const normalizedAreaCode = typeof areaCode === 'string' ? parseInt(areaCode, 10) : areaCode;
    const normalizedPhoneNumber =
      typeof phoneNumber === 'string' ? parseInt(phoneNumber, 10) : phoneNumber;
    return new Phone(normalizedAreaCode, normalizedPhoneNumber);
  }

  get areaCode(): number {
    return this._areaCode;
  }

  get phoneNumber(): number {
    return this._phoneNumber;
  }

  public toString(): string {
    return `${this._areaCode}${this._phoneNumber}`;
  }

  validate(): string[] {
    const errors: string[] = [];

    if (!Number.isInteger(this._areaCode) || this._areaCode < 11 || this._areaCode > 99)
      errors.push(InvalidDDDExceptionMessage);

    const phoneString = this._phoneNumber.toString();

    if (!/^\d{8,9}$/.test(phoneString)) errors.push(InvalidPhoneExceptionMessage);

    if (phoneString.length === 9 && !phoneString.startsWith('9'))
      errors.push(InvalidCellPhoneExceptionMessage);

    if (phoneString.length === 8 && phoneString.startsWith('9')) {
      errors.push(InvalidFixedPhoneExceptionMessage);
    }

    return errors;
  }
}
