import { CountingJob } from '@printer/domain/entities/counting-job';

export interface ICountingJobRepository {
  create(input: CountingJob): Promise<CountingJob>;
  findFailedOrPending(): Promise<CountingJob[] | null>;
  updateStatus(input: CountingJob): Promise<void>;
}
