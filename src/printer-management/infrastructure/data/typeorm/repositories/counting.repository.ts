import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountingEntity } from '../models';
import { Repository, TypeORMError } from 'typeorm';
import { ICountingRepository } from '@printer/domain/data/repositories';
import { Counting } from '@printer/domain/entities/counting';
import { DatabaseModelException } from '@printer/application/exceptions';
import { InfrastructureException } from '@shared/exceptions';

const DatabaseModelExceptionMessage = 'Houve um erro no banco de dados relacionado à localização.';
const InfrastructureExceptionMessage = 'Houve um erro interno. Tente novamente mais tarde.';

@Injectable()
export class CountingRepository implements ICountingRepository {
  private readonly logger = new Logger(CountingRepository.name);

  constructor(
    @InjectRepository(CountingEntity)
    private readonly repository: Repository<CountingEntity>,
  ) {}
  async create(counting: Counting): Promise<any> {
    try {
      const countingModel = CountingEntity.create({
        countingJobId: counting.countingJobId,
        printerId: counting.printerId,
        prints: counting.prints,
        copies: counting.copies,
        collectedAt: counting.collectedAt,
        type: counting.type,
      });
      return await this.repository.save(countingModel);
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
