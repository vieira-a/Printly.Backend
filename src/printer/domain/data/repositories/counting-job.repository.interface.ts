import { CountingJob } from '@printer/domain/entities/counting-job';

export interface ICountingJobRepository {
  create(input: CountingJob): Promise<void>;
}
