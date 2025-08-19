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

const DatabaseModelExceptionMessage = 'Houve um erro no banco de dados relacionado ao histórico de coletas.';
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

  async findPending(): Promise<CountingJob[] | null> {
    try {
      const jobs = await this.repository.find({
        where: { status: CountingJobStatus.PENDING },
      });

      return jobs.length ? CountingJobDataMapper.toDomainArray(jobs) : null;
    } catch (error: unknown) {
      this.logger.log(error);
      if (error instanceof TypeORMError) {
        this.logger.log(error);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      } else {
        throw new InfrastructureException(InfrastructureExceptionMessage);
      }
    }
  }

  async findFailedOrPendingByPrinterId(printerId: string): Promise<CountingJob | null> {
    try {
      const countingJob = await this.repository.findOneBy({
        printerId: printerId,
        status: CountingJobStatus.FAILED || CountingJobStatus.PENDING,
      });
      return countingJob ? CountingJobDataMapper.toDomain(countingJob) : null;
    } catch (error: unknown) {
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
      const { id, attempt, status, lastAttempt, executionDate } = input;
      await this.repository.update(id, {
        attempt,
        status: status as CountingJobStatus,
        lastAttempt,
        executionDate,
      });
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
