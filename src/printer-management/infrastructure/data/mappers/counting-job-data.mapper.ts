import { CountingJob } from '@printer/domain/entities/counting-job';
import { CountingJobEntity } from '../typeorm/models';
import { CountingJobStatus } from '@printer/domain/enums/counting-job-status.enum';

export abstract class CountingJobDataMapper {
  public static toDomain(entity: CountingJobEntity): CountingJob {
    return CountingJob.restore({
      id: entity.id,
      printerId: entity.printerId,
      attempt: entity.attempt,
      lastAttempt: entity.lastAttempt,
      status: entity.status,
      executionDate: entity.executionDate,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  public static toEntity(domain: CountingJob): CountingJobEntity {
    return CountingJobEntity.create({
      printerId: domain.printerId,
      status: domain.status as CountingJobStatus,
    });
  }

  public static toDomainArray(entities: CountingJobEntity[]): CountingJob[] {
    return entities.map((entity) =>
      CountingJob.restore({
        id: entity.id,
        printerId: entity.printerId,
        attempt: entity.attempt,
        lastAttempt: entity.lastAttempt,
        status: entity.status,
        executionDate: entity.executionDate,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      }),
    );
  }
}
