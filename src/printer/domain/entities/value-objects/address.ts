import { AddressDomainValidationException } from '../../exceptions';
import { CEP } from './cep';

const MissingStreetExceptionMessage = 'Nome da rua não informado.';
const InvalidStreetExceptionMessage = 'Nome da rua deve conter no mínimo 3 caracteres.';
const MissingDistrictExceptionMessage = 'Bairro não informado.';
const InvalidDistrictExceptionMessage = 'Bairro deve conter no mínimo 3 caracteres.';
const MissingCityExceptionMessage = 'Cidade não informada.';
const InvalidCityExceptionMessage = 'Cidade deve conter no mínimo 3 caracteres.';
const MissingStateExceptionMessage = 'Estado não informado.';
const InvalidStateExceptionMessage = 'Estado deve conter 2 caracteres.';
const ValidationExceptionMessage = 'Ocorreram um ou mais erros de validação.';

export class Address {
  private constructor(
    readonly street: string,
    readonly district: string,
    readonly city: string,
    readonly state: string,
    readonly cep: CEP,
    readonly reference?: string,
  ) {
    this.validate();
  }

  public static create(
    street: string,
    district: string,
    city: string,
    state: string,
    cep: CEP,
    reference?: string,
  ): Address {
    return new Address(street, district, city, state, cep, reference);
  }

  private validate(): void {
    const errors: string[] = [];

    if (!this.street) {
      errors.push(MissingStreetExceptionMessage);
    } else if (this.street.trim().length < 3) errors.push(InvalidStreetExceptionMessage);

    if (!this.district) {
      errors.push(MissingDistrictExceptionMessage);
    } else if (this.district.trim().length < 3) errors.push(InvalidDistrictExceptionMessage);

    if (!this.city) {
      errors.push(MissingCityExceptionMessage);
    } else if (this.city.trim().length < 3) errors.push(InvalidCityExceptionMessage);

    if (!this.state) {
      errors.push(MissingStateExceptionMessage);
    } else if (!/^[A-Z]{2}$/.test(this.state)) errors.push(InvalidStateExceptionMessage);

    if (errors.length > 0)
      throw new AddressDomainValidationException(ValidationExceptionMessage, errors);
  }
}
