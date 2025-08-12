import { Location, Model } from '../entities';
import { IPV4 } from '../entities/value-objects/ipv4';

export type CreatePrinterProps = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  model: Model;
  serial: string;
  ipv4: IPV4;
  location: Location;
  installedAt: Date;
};

export type UpdatePrinterProps = {
  serial?: string;
  ipv4?: string;
};
