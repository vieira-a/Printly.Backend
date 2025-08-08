import { IPv4DomainValidationException } from '@printer/domain/exceptions/ipv4-domain-validation.exception';

const MissingIPv4ExceptionMessage = 'IP não informado.';
const InvalidIPv4ExceptionMessage = 'IP inválido. Formato esperado: xxx.xxx.xxx.xxx';
const ValidationExceptionMessage = 'Ocorreram um ou mais erros de validação.';

export class IPV4 {
  private constructor(private readonly value: string) {}

  static create(raw: string): IPV4 {
    const errors: string[] = [];

    if (!raw) errors.push(MissingIPv4ExceptionMessage);

    const trimmed = raw?.trim();

    if (!IPV4.isValidIPv4(trimmed)) errors.push(InvalidIPv4ExceptionMessage);

    if (errors.length > 0)
      throw new IPv4DomainValidationException(ValidationExceptionMessage, errors);

    return new IPV4(trimmed);
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
    return this.value;
  }

  public toPrimitives(): string {
    return this.value;
  }

  public getOctets(): number[] {
    return this.value.split('.').map((octet) => Number(octet));
  }
}
