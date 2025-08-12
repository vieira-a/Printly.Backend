export type CreateCountingProps = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  printerId: string;
  totalPrint: number;
  totalCopy: number;
  collectedAt: Date;
};
