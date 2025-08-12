import { LocationDomainValidationException } from '../exceptions';
import { CreateLocationProps, UpdateLocationProps } from '../types/location.props';
import { EntityBase } from './entity-base';
import { Address } from './value-objects/address';
import { Phone } from './value-objects/phone';

const MissingAddressExceptionMessage = 'Endereço não informado.';
const MissingPhoneExceptionMessage = 'Telefone não informado.';
const MissingContactExceptionMessage = 'Contato não informado.';
const InvalidContactExceptionMessage = 'Contato deve ter no mínimo 3 caracteres.';
const ValidationExceptionMessage = 'Ocorreram um ou mais erros de validação.';

export class Location extends EntityBase {
  private _address: Address;
  private _phone: Phone;
  private _contact: string;

  private constructor(props: CreateLocationProps) {
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

  updateAddress(address: Address) {
    this._address = address;
  }

  updatePhone(phone: Phone) {
    this._phone = phone;
  }

  updateContact(contact: string) {
    this._contact = contact;
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

  public update(props?: UpdateLocationProps): Location {
    return new Location({
      id: this.id,
      address: props?.address ?? this._address,
      phone: props?.phone ?? this._phone,
      contact: props?.contact ?? this._contact,
      createdAt: this.createdAt,
      updatedAt: new Date(),
    });
  }

  private validate(): void {
    const errors: string[] = [];

    if (!this._address) errors.push(MissingAddressExceptionMessage);
    else errors.push(...this.address.validate());

    if (!this._phone) errors.push(MissingPhoneExceptionMessage);
    else errors.push(...this.phone.validate());

    if (!this._contact) {
      errors.push(MissingContactExceptionMessage);
    } else if (this._contact.trim().length < 3) errors.push(InvalidContactExceptionMessage);

    if (errors.length > 0)
      throw new LocationDomainValidationException(ValidationExceptionMessage, errors);
  }
}
