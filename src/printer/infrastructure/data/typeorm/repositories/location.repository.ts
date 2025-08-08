import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILocationRepository } from '@printer/domain/repositories/location-repository.interface';
import { LocationModel } from '../models/location.model';
import { TypeORMError, type Repository } from 'typeorm';
import { DatabaseModelException } from '@printer/application/exceptions';
import { InfrastructureException } from '@shared/exceptions/infrastructure.exception';
import type { Location } from '@printer/domain/entities';
import { LocationDataMapper } from '../../mappers/location-data.mapper';

const DatabaseModelExceptionMessage = 'Houve um erro no banco de dados relacionado à localização.';
const InfrastructureExceptionMessage = 'Houve um erro interno. Tente novamente mais tarde.';

@Injectable()
export class LocationRepository implements ILocationRepository {
  private readonly logger = new Logger(LocationRepository.name);

  constructor(
    @InjectRepository(LocationModel)
    private readonly repository: Repository<LocationModel>,
  ) {}
  async create(input: Location): Promise<Location> {
    try {
      const newLocation = LocationDataMapper.toModel(input);

      const result = await this.repository.save(newLocation);
      return LocationDataMapper.toDomain(result);
    } catch (error) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      } else {
        this.logger.log(error.message);
        throw new InfrastructureException(InfrastructureExceptionMessage);
      }
    }
  }
}
