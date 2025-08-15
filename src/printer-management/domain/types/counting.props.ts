import { CountingType } from '../enums/counting-type.enum';

export type CreateCountingProps = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  printerId: string;
  totalPrint: number;
  totalCopy: number;
  collectedAt: Date;
  type: CountingType;
};
