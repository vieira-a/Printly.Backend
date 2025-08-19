import { Address } from '../entities/value-objects/address';
import { Phone } from '../entities/value-objects/phone';

export type InstallationLocationProps = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  address: Address;
  phone: Phone;
  departament: string;
  contact: string;
};

export type InstallationLocationEntityProps = {
  street: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  reference?: string;
  areaCode: number;
  phoneNumber: number;
  departament: string;
  contact: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateInstallationLocationEntityProps = {
  street: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  reference?: string;
  areaCode: number;
  phoneNumber: number;
  departament: string;
  contact: string;
};

export type CreateInstallationLocationProps = {
  address: Address;
  phone: Phone;
  departament: string;
  contact: string;
};

export type UpdateLocationProps = {
  address?: Address;
  phone?: Phone;
  contact?: string;
};
