import { CountingJobStatus } from '@printer/domain/enums/counting-job-status.enum';

export abstract class CreateCountingJobInput {
  printerId: string;
  ipv4: string;
  status: CountingJobStatus;
  countingId?: string;
  errorMessage?: string;
}
