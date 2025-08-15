import { AddressDomainValidationException } from '@printer/domain/exceptions/address-domain-validation.exception';
import { CEP } from './cep';
import { AddressProps } from '@printer/domain/types/address.props';

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
  private _street: string;
  private _district: string;
  private _city: string;
  private _state: string;
  private _cep: CEP;
  private _reference?: string;

  private constructor(props: AddressProps) {
    this._street = props.street;
    this._district = props.district;
    this._city = props.city;
    this._state = props.state;
    this._cep = props.cep;
    this._reference = props.reference;
  }

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

  public static create(props: AddressProps): Address {
    return new Address({ ...props });
  }

  private validate(): void {
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

    if (errors.length > 0)
      throw new AddressDomainValidationException(ValidationExceptionMessage, errors);
  }
}
