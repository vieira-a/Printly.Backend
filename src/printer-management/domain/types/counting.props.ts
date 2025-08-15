import { CountingType } from '../enums/counting-type.enum';

export type CountingProps = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  countingJobId: string;
  printerId: string;
  type: CountingType;
  prints: number;
  copies: number;
  collectedAt: Date;
};

export type CreateCountingProps = {
  countingJobId: string;
  printerId: string;
  type: CountingType;
  prints: number;
  copies: number;
  collectedAt: Date;
};
