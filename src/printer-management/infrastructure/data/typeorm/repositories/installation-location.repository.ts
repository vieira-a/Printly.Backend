import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IInstallationLocationRepository } from '@printer/domain/data/repositories';
import { InstallationLocationEntity } from '../models/installation-location.entity';
import { TypeORMError, type Repository } from 'typeorm';
import { DatabaseModelException } from '@printer/application/exceptions';
import { InfrastructureException } from '@shared/exceptions/infrastructure.exception';
import { InstallationLocation } from '@printer/domain/entities';
import { InstallationLocationDataMapper } from '../../mappers/installation-location-data.mapper';

const DatabaseModelExceptionMessage = 'Houve um erro no banco de dados relacionado à localização.';
const InfrastructureExceptionMessage = 'Houve um erro interno. Tente novamente mais tarde.';

@Injectable()
export class InstallationLocationRepository implements IInstallationLocationRepository {
  private readonly logger = new Logger(InstallationLocationRepository.name);

  constructor(
    @InjectRepository(InstallationLocationEntity)
    private readonly repository: Repository<InstallationLocationEntity>,
  ) {}

  async create(input: InstallationLocation): Promise<InstallationLocation> {
    try {
      const newLocation = InstallationLocationDataMapper.toEntity(input);

      const result = await this.repository.save(newLocation);
      return InstallationLocationDataMapper.toDomain(result);
    } catch (error: unknown) {
      if (error instanceof TypeORMError) {
        this.logger.error(`${error.name}: ${error.message}`);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      }
      if (error instanceof Error) {
        this.logger.log(error.message);
      }
      throw new InfrastructureException(InfrastructureExceptionMessage);
    }
  }

  async findById(id: string): Promise<InstallationLocation | null> {
    try {
      const location = await this.repository.findOne({ where: { id } });

      return location ? InstallationLocationDataMapper.toDomain(location) : null;
    } catch (error: unknown) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      }
      if (error instanceof Error) {
        this.logger.log(error.message);
      }
      throw new InfrastructureException(InfrastructureExceptionMessage);
    }
  }

  async existsById(id: string): Promise<boolean> {
    try {
      const installationLocation = await this.repository.findOneBy({ id });

      return installationLocation ? true : false;
    } catch (error: unknown) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      }
      if (error instanceof Error) {
        this.logger.log(error.message);
      }
      throw new InfrastructureException(InfrastructureExceptionMessage);
    }
  }

  async update(input: InstallationLocation): Promise<InstallationLocation | null> {
    try {
      const installationLocationEntity = InstallationLocationDataMapper.toEntity(input);
      await this.repository.update(installationLocationEntity.id, installationLocationEntity);

      const updatedInstallationLocation = await this.repository.findOne({
        where: { id: installationLocationEntity.id },
      });
      return updatedInstallationLocation ? InstallationLocationDataMapper.toDomain(updatedInstallationLocation) : null;
    } catch (error: unknown) {
      if (error instanceof TypeORMError) {
        this.logger.log(error.message);
        throw new DatabaseModelException(DatabaseModelExceptionMessage);
      }
      if (error instanceof Error) {
        this.logger.log(error.message);
      }
      throw new InfrastructureException(InfrastructureExceptionMessage);
    }
  }
}
