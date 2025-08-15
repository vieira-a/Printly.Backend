import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IUpdateLocationUseCase } from './update-location.interface';
import { UpdateLocationInput } from './input/update-location.input';
import { UpdateLocationOutput } from './output/update-location.output';
import { ILocationRepository } from '@printer/domain/data/repositories';
import { LocationNotFoundException } from '@printer/application/exceptions/location-not-found.exception';
import { LocationMapper } from '@printer/application/mappers/location.mapper';
import { LocationDomainValidationException } from '@printer/domain/exceptions';
import { DatabaseModelException } from '@printer/application/exceptions';
import { UpdateLocationDetails } from '@printer/domain/services/update-location-details.service';

@Injectable()
export class UpdateLocationService implements IUpdateLocationUseCase {
  private readonly logger = new Logger(UpdateLocationService.name);

  constructor(
    @Inject('ILocationRepository')
    private readonly locationRepository: ILocationRepository,
    private readonly updateLocationDetails: UpdateLocationDetails,
  ) {}
  async execute(id: string, input: UpdateLocationInput): Promise<UpdateLocationOutput> {
    try {
      const location = await this.locationRepository.findById(id);
      if (!location) throw new LocationNotFoundException(id);

      const updatedRestoredLocation = this.updateLocationDetails.update(location, input);
      const updatedLocation = await this.locationRepository.update(updatedRestoredLocation);

      return LocationMapper.toOutput(updatedLocation);
    } catch (error) {
      this.logger.log(error.message);
      if (error instanceof LocationDomainValidationException) {
        throw new UnprocessableEntityException({
          message: error.message,
          errors: error.errors,
        });
      } else if (error instanceof DatabaseModelException) {
        throw new InternalServerErrorException(error.message);
      }
      throw error;
    }
  }
}
