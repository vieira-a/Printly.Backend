import { Address } from '../entities/value-objects/address';
import { Phone } from '../entities/value-objects/phone';

export type InstallationLocationProps = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  address: Address;
  phone: Phone;
  contact: string;
};

export type CreateInstallationLocationProps = {
  address: Address;
  phone: Phone;
  contact: string;
};

export type UpdateLocationProps = {
  address?: Address;
  phone?: Phone;
  contact?: string;
};
