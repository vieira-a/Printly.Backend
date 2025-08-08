const MissingIPv4ExceptionMessage = 'IP não informado.';
const InvalidIPv4ExceptionMessage = 'IP inválido. Formato esperado: xxx.xxx.xxx.xxx';

export class IPV4 {
  private constructor(private readonly value: string) {}

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
    return this.value;
  }

  public toPrimitives(): string {
    return this.value;
  }

  public getOctets(): number[] {
    return this.value.split('.').map((octet) => Number(octet));
  }

  public validate(): string[] {
    const errors: string[] = [];

    if (!this.value) errors.push(MissingIPv4ExceptionMessage);

    if (!IPV4.isValidIPv4(this.value)) errors.push(InvalidIPv4ExceptionMessage);

    return errors;
  }
}
