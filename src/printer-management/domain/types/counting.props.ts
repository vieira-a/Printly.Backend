import { CountingJobType } from '../enums/counting-job-type.enum';

export type CountingProps = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  countingJobId: string;
  printerId: string;
  type: CountingJobType;
  prints: number;
  copies: number;
  collectedAt: Date;
};

export type CreateCountingProps = {
  countingJobId: string;
  printerId: string;
  type: CountingJobType;
  prints: number;
  copies: number;
  collectedAt: Date;
};
