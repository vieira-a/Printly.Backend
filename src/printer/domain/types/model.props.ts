export type CreateModelProps = {
  manufacturer: string;
  description: string;
  printOid: string;
  copyOid: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UpdateModelProps = {
  manufacturer?: string;
  description?: string;
  printOid?: string;
  copyOid?: string;
};
