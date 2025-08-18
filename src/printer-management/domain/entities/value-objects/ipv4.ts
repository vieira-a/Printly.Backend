import { IPv4DomainValidationException } from '@printer/domain/exceptions';

const MissingIPv4ExceptionMessage = 'IP não informado.';
const InvalidIPv4ExceptionMessage = 'IP inválido. Formato esperado: xxx.xxx.xxx.xxx';
const ValidationExceptionMessage = 'Ocorreram um ou mais erros de validação.';

export class IPV4 {
  private constructor(private readonly _value: string) {
    this.validate();
  }

  static create(raw: string): IPV4 {
    const cleaned = raw?.trim() ?? '';
    return new IPV4(cleaned);
  }

  private static isValidIPv4(ip: string): boolean {
    const parts = ip.split('.');
    if (parts.length !== 4) return false;

    return parts.every((part) => {
      if (!/^\d{1,3}$/.test(part)) return false;
      const num = Number(part);
      return num >= 0 && num <= 255;
    });
  }

  public toString(): string {
    return this._value;
  }

  public toPrimitives(): string {
    return this._value;
  }

  public getOctets(): number[] {
    return this._value.split('.').map((octet) => Number(octet));
  }

  private validate(): void {
    const errors: string[] = [];

    if (!this._value) errors.push(MissingIPv4ExceptionMessage);

    if (!IPV4.isValidIPv4(this._value)) errors.push(InvalidIPv4ExceptionMessage);

    if (errors.length > 0) throw new IPv4DomainValidationException(ValidationExceptionMessage, errors);
  }
}
