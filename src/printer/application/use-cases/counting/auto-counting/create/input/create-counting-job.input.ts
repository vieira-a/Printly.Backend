import { CountingJobStatus } from '@printer/domain/entities/counting-job';

export abstract class CreateCountingJobInput {
  printerId: string;
  ipv4: string;
  status: CountingJobStatus;
  countingId?: string;
  errorMessage?: string;
}
