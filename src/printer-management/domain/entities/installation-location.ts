import { InstallationLocationDomainValidationException } from '../exceptions';
import { CreateInstallationLocationProps, InstallationLocationProps } from '../types/installation-location.props';
import { EntityBase } from './entity-base';
import { Address } from './value-objects/address';
import { Phone } from './value-objects/phone';

const MissingAddressExceptionMessage = 'Endereço não informado.';
const MissingPhoneExceptionMessage = 'Telefone não informado.';
const MissingContactExceptionMessage = 'Contato não informado.';
const InvalidContactExceptionMessage = 'Contato deve ter no mínimo 3 caracteres.';
const ValidationExceptionMessage = 'Ocorreram um ou mais erros de validação.';

export class InstallationLocation extends EntityBase {
  private _address: Address;
  private _phone: Phone;
  private _contact: string;

  private constructor(props: InstallationLocationProps) {
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

  public static create(props: CreateInstallationLocationProps): InstallationLocation {
    return new InstallationLocation({ ...props });
  }

  public static restore(props: InstallationLocationProps): InstallationLocation {
    return new InstallationLocation({ ...props });
  }

  private validate(): void {
    const errors: string[] = [];

    if (!this._address) errors.push(MissingAddressExceptionMessage);

    if (!this._phone) errors.push(MissingPhoneExceptionMessage);

    if (!this._contact) {
      errors.push(MissingContactExceptionMessage);
    } else if (this._contact.trim().length < 3) errors.push(InvalidContactExceptionMessage);

    if (errors.length > 0) throw new InstallationLocationDomainValidationException(ValidationExceptionMessage, errors);
  }
}
