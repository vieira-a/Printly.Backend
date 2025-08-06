import { InvalidParamException } from '../../exceptions';

const InvalidDDDExceptionMessage = 'DDD deve conter dois dígitos entre 11 e 99.';
const InvalidPhoneExceptionMessage = 'Número de telefone deve conter 8 ou 9 digitos.';
const InvalidCellPhoneExceptionMessage = 'Número de celular deve começar com 9.';
const InvalidFixedPhoneExceptionMessage = 'Número fixo não deve começar com 9.';

export class Phone {
  private constructor(
    readonly areaCode: number,
    readonly phoneNumber: number,
  ) {
    this.validate();
  }

  public static create(areaCode: number, phoneNumber: number): Phone {
    return new Phone(areaCode, phoneNumber);
  }

  public toString(): string {
    return `${this.areaCode}${this.phoneNumber}`;
  }

  private validate(): void {
    if (!Number.isInteger(this.areaCode) || this.areaCode < 11 || this.areaCode > 99)
      throw new InvalidParamException(InvalidDDDExceptionMessage);

    const phoneString = this.phoneNumber.toString();
    if (!/^\d{8,9}$/.test(phoneString))
      throw new InvalidParamException(InvalidPhoneExceptionMessage);

    if (phoneString.length === 9 && !phoneString.startsWith('9'))
      throw new InvalidParamException(InvalidCellPhoneExceptionMessage);

    if (phoneString.length === 8 && phoneString.startsWith('9')) {
      throw new InvalidParamException(InvalidFixedPhoneExceptionMessage);
    }
  }
}
