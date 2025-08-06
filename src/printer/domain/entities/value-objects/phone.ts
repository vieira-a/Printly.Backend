export class Phone {
  private constructor(
    readonly areaCode: number,
    readonly phoneNumber: number,
  ) {}

  public static create(areaCode: number, phoneNumber: number): Phone {
    return new Phone(areaCode, phoneNumber);
  }

  public toString(): string {
    return `${this.areaCode}${this.phoneNumber}`;
  }
}
