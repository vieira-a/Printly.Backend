import { Printer } from '../entities';
import { CountingJobStatus } from '../enums/counting-job-status.enum';

export type CountingJobProps = {
  printerId: string;
  printer?: Printer;
  attempt: number;
  lastAttempt: Date;
  status: CountingJobStatus;
  executionDate: Date;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateCountingJobProps = {
  printerId: string;
  //attempt: number;
  //lastAttempt: Date;
  status: CountingJobStatus;
  //executionDate: Date;
};
