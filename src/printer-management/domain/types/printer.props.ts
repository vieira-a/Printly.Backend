import { IPV4 } from '../entities/value-objects/ipv4';

export type PrinterProps = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  serialNumber: string;
  ipv4Address: IPV4;
  modelId: string;
  installationLocationId: string;
  installedAt: Date;
  totalPrint: number;
  totalCopy: number;
};

export type CreatePrinterProps = {
  serialNumber: string;
  ipv4Address: IPV4;
  modelId: string;
  installationLocationId: string;
  installedAt: Date;
  totalPrint: number;
  totalCopy: number;
};

export type PrinterEntityProps = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  serialNumber: string;
  ipv4Address: string;
  modelId: string;
  installationLocationId: string;
  installedAt: Date;
  totalPrint: number;
  totalCopy: number;
};

export type CreatePrinterEntityProps = {
  serialNumber: string;
  ipv4Address: string;
  modelId: string;
  installationLocationId: string;
  installedAt: Date;
  totalPrint: number;
  totalCopy: number;
};

export type UpdatePrinterProps = {
  serialNumber?: string;
  ipv4Address?: string;
};
