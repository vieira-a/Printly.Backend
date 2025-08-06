import { InvalidParamException, MissingParamException } from '../../exceptions';

const MissingStreetExceptionMessage = 'Nome da rua não informado.';
const InvalidStreetExceptionMessage = 'Nome da rua deve conter no mínimo 3 caracteres.';

export class Address {
  private constructor(
    readonly street: string,
    readonly district: string,
    readonly city: string,
    readonly state: string,
    readonly cep: string,
    readonly reference?: string,
  ) {
    this.validate();
  }

  public static create(
    street: string,
    district: string,
    city: string,
    state: string,
    cep: string,
    reference?: string,
  ): Address {
    return new Address(street, district, city, state, cep, reference);
  }

  private validate(): void {
    if (!this.street) throw new MissingParamException(MissingStreetExceptionMessage);
    if (this.street.trim().length < 3)
      throw new InvalidParamException(InvalidStreetExceptionMessage);
  }
}
