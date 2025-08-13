import { CountingJob } from '@printer/domain/entities/counting-job';
import { CountingJobModel } from '../typeorm/models';
import { CountingJobStatus } from '@printer/domain/enums/counting-job-status.enum';

export abstract class CountingJobDataMapper {
  public static toModel(entity: CountingJob): CountingJobModel {
    return CountingJobModel.create(
      entity.printerId,
      entity.ipv4,
      entity.status as CountingJobStatus,
      entity.attempt,
      entity.lastAttempt,
      entity.maxAttempts,
      entity.countingId,
      entity.errorMessage,
    );
  }
}
