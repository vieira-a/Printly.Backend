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
import { Address } from '@printer/domain/entities/value-objects/address';
import { CEP } from '@printer/domain/entities/value-objects/cep';
import { Phone } from '@printer/domain/entities/value-objects/phone';
import { LocationDomainValidationException } from '@printer/domain/exceptions';
import { DatabaseModelException } from '@printer/application/exceptions';

@Injectable()
export class UpdateLocationService implements IUpdateLocationUseCase {
  private readonly logger = new Logger(UpdateLocationService.name);

  constructor(
    @Inject('ILocationRepository')
    private readonly locationRepository: ILocationRepository,
  ) {}
  async execute(id: string, input: UpdateLocationInput): Promise<UpdateLocationOutput> {
    try {
      const location = await this.locationRepository.findById(id);
      if (!location) throw new LocationNotFoundException(id);

      if (input.address) {
        const address = Address.create(
          input.address.street || location.address.street,
          input.address.district || location.address.district,
          input.address.city || location.address.city,
          input.address.state || location.address.state,
          CEP.create(input.address.cep || location.address.cep.value),
          input.address.reference || location.address.reference,
        );
        location.updateAddress(address);
      }

      if (input.phone) {
        const phone = Phone.create(
          input.phone.areaCode || location.phone.areaCode,
          input.phone.phoneNumber || location.phone.phoneNumber,
        );
        location.updatePhone(phone);
      }

      if (input.contact !== undefined) {
        location.updateContact(input.contact);
      }

      const updatedLocation = await this.locationRepository.update(location);

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
