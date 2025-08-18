import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { ICountingJobRepository } from '@printer/domain/data/repositories/counting-job.repository.interface';
import { CountingJob } from '@printer/domain/entities/counting-job';
import { CountingJobEntity } from '../models';
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
    @InjectRepository(CountingJobEntity)
    private readonly repository: Repository<CountingJobEntity>,
  ) {}

  async create(input: CountingJob): Promise<CountingJob> {
    try {
      const countJobEntity = CountingJobDataMapper.toEntity(input);

      const savedCountingJob = await this.repository.save(countJobEntity);
      return CountingJobDataMapper.toDomain(savedCountingJob);
    } catch (error) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
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

      return jobs.length ? CountingJobDataMapper.toDomainArray(jobs) : null;
    } catch (error) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      } else {
        throw new InfrastructureException(InfrastructureExceptionMessage);
      }
    }
  }

  async updateStatus(input: CountingJob): Promise<void> {
    try {
      const job = CountingJobDataMapper.toEntity(input);

      await this.repository.update(job.id, { status: job.status });
    } catch (error) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      } else {
        throw new InfrastructureException(InfrastructureExceptionMessage);
      }
    }
  }
}
