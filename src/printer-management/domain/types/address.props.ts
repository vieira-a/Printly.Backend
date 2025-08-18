import { CEP } from '../entities/value-objects/cep';

export type AddressProps = {
  street: string;
  district: string;
  city: string;
  state: string;
  cep: CEP;
  reference?: string;
};
