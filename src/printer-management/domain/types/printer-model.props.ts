export type PrinterModelProps = {
  manufacturer: string;
  description: string;
  printOid: string;
  copyOid: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreatePrinterModelProps = {
  manufacturer: string;
  description: string;
  printOid: string;
  copyOid: string;
};

export type UpdatePrinterModelProps = {
  manufacturer?: string;
  description?: string;
  printOid?: string;
  copyOid?: string;
};
