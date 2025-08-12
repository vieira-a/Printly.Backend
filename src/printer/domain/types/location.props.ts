import type { Address } from '../entities/value-objects/address';
import type { Phone } from '../entities/value-objects/phone';

export type CreateLocationProps = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  address: Address;
  phone: Phone;
  contact: string;
};

export type UpdateLocationProps = {
  address?: Address;
  phone?: Phone;
  contact?: string;
};
