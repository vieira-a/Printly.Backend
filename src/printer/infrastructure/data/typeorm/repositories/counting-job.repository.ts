import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, TypeORMError } from 'typeorm';
import { ICountingJobRepository } from '@printer/domain/data/repositories/counting-job.repository.interface';
import { CountingJob } from '@printer/domain/entities/counting-job';
import { CountingJobModel } from '../models';
import { CountingJobDataMapper } from '../../mappers/counting-job-data.mapper';
import { DatabaseModelException } from '@printer/application/exceptions';
import { InfrastructureException } from '@shared/exceptions';
import { CountingJobStatus } from '@printer/domain/enums/counting-job-status.enum';

const DatabaseModelExceptionMessage = 'Houve um erro no banco de dados relacionado à localização.';
const InfrastructureExceptionMessage = 'Houve um erro interno. Tente novamente mais tarde.';

@Injectable()
export class CountingJobRepository implements ICountingJobRepository {
  private readonly logger = new Logger(CountingJobRepository.name);

  constructor(
    @InjectRepository(CountingJobModel)
    private readonly repository: Repository<CountingJobModel>,
  ) {}

  async create(input: CountingJob): Promise<void> {
    try {
      const countJobModel = CountingJobDataMapper.toModel(input);
      await this.repository.save(countJobModel);
    } catch (error) {
      this.logger.log(error.message);
      if (error instanceof TypeORMError) {
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      } else {
        throw new InfrastructureException(InfrastructureExceptionMessage);
      }
    }
  }

  async findFailedOrPending(): Promise<CountingJob[] | null> {
    try {
      const jobs = await this.repository
        .createQueryBuilder('job')
        .leftJoinAndSelect('job.printer', 'printer')
        .leftJoinAndSelect('printer.model', 'model')
        .leftJoinAndSelect('printer.location', 'location')
        .where('job.status IN (:...statuses)', {
          statuses: [CountingJobStatus.FAILED, CountingJobStatus.PENDING],
        })
        .getMany();
      // const jobs = await this.repository.find({
      //   where: { status: In([CountingJobStatus.FAILED, CountingJobStatus.PENDING]) },
      //   relations: ['printer'],
      // });

      return jobs.length ? CountingJobDataMapper.toDomainArray(jobs) : null;
    } catch (error) {
      this.logger.log(error.message);
      if (error instanceof TypeORMError) {
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      } else {
        throw new InfrastructureException(InfrastructureExceptionMessage);
      }
    }
  }

  async updateStatus(input: CountingJob): Promise<void> {
    try {
      const job = CountingJobDataMapper.restoreToModel(input);
      this.logger.log(
        `JOB ID: ${job.id} - COUNTING ID: ${job.countingId} - MESSAGE: ${job.errorMessage}`,
      );
      await this.repository.update(job.id, {
        status: job.status,
        attempt: job.attempt,
        lastAttempt: job.lastAttempt,
        countingId: job.countingId,
        errorMessage: job.errorMessage,
      });
    } catch (error) {
      this.logger.log(error.message);
      if (error instanceof TypeORMError) {
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      } else {
        throw new InfrastructureException(InfrastructureExceptionMessage);
      }
    }
  }
}
