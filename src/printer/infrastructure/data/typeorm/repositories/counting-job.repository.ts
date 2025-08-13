import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { ICountingJobRepository } from '@printer/domain/data/repositories/counting-job.repository.interface';
import { CountingJob } from '@printer/domain/entities/counting-job';
import { CountingJobModel } from '../models';
import { CountingJobDataMapper } from '../../mappers/counting-job-data.mapper';
import { DatabaseModelException } from '@printer/application/exceptions';
import { InfrastructureException } from '@shared/exceptions';

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
}
