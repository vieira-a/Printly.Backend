import { LocationDomainValidationException } from '../exceptions';
import { EntityBase } from './entity-base';
import { Address } from './value-objects/address';
import { Phone } from './value-objects/phone';

const MissingAddressExceptionMessage = 'Endereço não informado.';
const MissingPhoneExceptionMessage = 'Telefone não informado.';
const MissingContactExceptionMessage = 'Contato não informado.';
const InvalidContactExceptionMessage = 'Contato deve ter no mínimo 3 caracteres.';
const ValidationExceptionMessage = 'Ocorreram um ou mais erros de validação.';

interface LocationProps {
  address: Address;
  phone: Phone;
  contact: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Location extends EntityBase {
  private _address: Address;
  private _phone: Phone;
  private _contact: string;

  private constructor(props: LocationProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._address = props.address;
    this._phone = props.phone;
    this._contact = props.contact;
    this.validate();
  }

  get address(): Address {
    return this._address;
  }

  get phone(): Phone {
    return this._phone;
  }

  get contact(): string {
    return this._contact;
  }

  public static create(address: Address, phone: Phone, contact: string): Location {
    return new Location({ address, phone, contact });
  }

  public static restore(
    id: string,
    address: Address,
    phone: Phone,
    contact: string,
    createdAt: Date,
    updatedAt: Date,
  ): Location {
    return new Location({ id, address, phone, contact, createdAt, updatedAt });
  }

  private validate(): void {
    const errors: string[] = [];

    if (!this.address) errors.push(MissingAddressExceptionMessage);
    if (!this.phone) errors.push(MissingPhoneExceptionMessage);

    if (!this.contact) {
      errors.push(MissingContactExceptionMessage);
    } else if (this.contact.trim().length < 3) errors.push(InvalidContactExceptionMessage);

    if (errors.length > 0)
      throw new LocationDomainValidationException(ValidationExceptionMessage, errors);
  }
}
