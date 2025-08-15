import { PhoneDomainValidationException } from '@printer/domain/exceptions/phone-domain-validation.exception';
import { PhoneProps } from '@printer/domain/types/phone.props';

const InvalidDDDExceptionMessage = 'DDD deve conter dois dígitos entre 11 e 99.';
const InvalidPhoneExceptionMessage = 'Número de telefone deve conter 8 ou 9 digitos.';
const InvalidCellPhoneExceptionMessage = 'Número de celular com 9 dígitos deve começar com 9.';
const InvalidFixedPhoneExceptionMessage = 'Número fixo com 8 dígitos não deve começar com 9.';
const ValidationExceptionMessage = 'Ocorreram um ou mais erros de validação.';

export class Phone {
  private _areaCode: number;
  private _phoneNumber: number;

  private constructor(props: PhoneProps) {
    this._areaCode = props.areaCode;
    this._phoneNumber = props.phoneNumber;
    this.validate();
  }

  public static create(props: PhoneProps): Phone {
    const normalizedAreaCode =
      typeof props.areaCode === 'string' ? parseInt(props.areaCode, 10) : props.areaCode;
    const normalizedPhoneNumber =
      typeof props.phoneNumber === 'string' ? parseInt(props.phoneNumber, 10) : props.phoneNumber;
    return new Phone({ areaCode: normalizedAreaCode, phoneNumber: normalizedPhoneNumber });
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

  private validate(): void {
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

    if (errors.length > 0)
      throw new PhoneDomainValidationException(ValidationExceptionMessage, errors);
  }
}
