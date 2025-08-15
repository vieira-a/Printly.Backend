import { CEP } from './cep';

const MissingStreetExceptionMessage = 'Nome da rua não informado.';
const InvalidStreetExceptionMessage = 'Nome da rua deve conter no mínimo 3 caracteres.';
const MissingDistrictExceptionMessage = 'Bairro não informado.';
const InvalidDistrictExceptionMessage = 'Bairro deve conter no mínimo 3 caracteres.';
const MissingCityExceptionMessage = 'Cidade não informada.';
const InvalidCityExceptionMessage = 'Cidade deve conter no mínimo 3 caracteres.';
const MissingStateExceptionMessage = 'Estado não informado.';
const InvalidStateExceptionMessage = 'Estado deve conter 2 caracteres.';

export class Address {
  private constructor(
    private readonly _street: string,
    private readonly _district: string,
    private readonly _city: string,
    private readonly _state: string,
    private readonly _cep: CEP,
    private readonly _reference?: string,
  ) {}

  get street(): string {
    return this._street;
  }

  get district(): string {
    return this._district;
  }

  get state(): string {
    return this._state;
  }

  get city(): string {
    return this._city;
  }

  get cep(): CEP {
    return this._cep;
  }

  get reference(): string | undefined {
    return this._reference;
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

  validate(): string[] {
    const errors: string[] = [];

    if (!this._street) {
      errors.push(MissingStreetExceptionMessage);
    } else if (this._street.trim().length < 3) errors.push(InvalidStreetExceptionMessage);

    if (!this._district) {
      errors.push(MissingDistrictExceptionMessage);
    } else if (this._district.trim().length < 3) errors.push(InvalidDistrictExceptionMessage);

    if (!this._city) {
      errors.push(MissingCityExceptionMessage);
    } else if (this._city.trim().length < 3) errors.push(InvalidCityExceptionMessage);

    if (!this._state) {
      errors.push(MissingStateExceptionMessage);
    } else if (!/^[A-Z]{2}$/.test(this.state)) errors.push(InvalidStateExceptionMessage);

    errors.push(...this._cep?.validate());

    return errors;
  }
}
