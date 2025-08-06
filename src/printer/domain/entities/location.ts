import { EntityBase } from './entity-base';
import type { Address } from './value-objects/address';
import type { Phone } from './value-objects/phone';

export class Location extends EntityBase {
  readonly address: Address;
  readonly phone: Phone;
  readonly contact: string;

  private constructor(address: Address, phone: Phone, contact: string) {
    super();
    this.address = address;
    this.phone = phone;
    this.contact = contact;
  }

  public static create(address: Address, phone: Phone, contact: string): Location {
    return new Location(address, phone, contact);
  }
}
