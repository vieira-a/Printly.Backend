import { InvalidParamException, MissingParamException } from '../exceptions';
import { EntityBase } from './entity-base';
import type { Address } from './value-objects/address';
import type { Phone } from './value-objects/phone';

const MissingAddressExceptionMessage = 'Endereço não informado.';
const MissingPhoneExceptionMessage = 'Telefone não informado.';
const MissingContactExceptionMessage = 'Contato não informado.';
const InvalidContactExceptionMessage = 'Contato deve ter no mínimo 3 caracteres.';

export class Location extends EntityBase {
  readonly address: Address;
  readonly phone: Phone;
  readonly contact: string;

  private constructor(address: Address, phone: Phone, contact: string) {
    super();
    this.address = address;
    this.phone = phone;
    this.contact = contact;
    this.validate();
  }

  public static create(address: Address, phone: Phone, contact: string): Location {
    return new Location(address, phone, contact);
  }

  private validate(): void {
    if (!this.address) throw new MissingParamException(MissingAddressExceptionMessage);
    if (!this.phone) throw new MissingParamException(MissingPhoneExceptionMessage);
    if (!this.contact) throw new MissingParamException(MissingContactExceptionMessage);
    if (this.contact.trim().length < 3)
      throw new InvalidParamException(InvalidContactExceptionMessage);
  }
}
