import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ICreateLocationUseCase } from './create-location.interface';
import { CreateLocationInput } from './input/create-location.input';
import { CreateLocationOutput } from './output/create-location.output';
import type { ILocationRepository } from '@printer/domain/repositories/location-repository.interface';
import {
  AddressDomainValidationException,
  CepDomainValidationException,
  LocationDomainValidationException,
  PhoneDomainValidationException,
} from '@printer/domain/exceptions';
import { DatabaseModelException } from '@printer/application/exceptions';
import { Location } from '@printer/domain/entities';
import { Address } from '@printer/domain/entities/value-objects/address';
import { CEP } from '@printer/domain/entities/value-objects/cep';
import { Phone } from '@printer/domain/entities/value-objects/phone';
import { LocationMapper } from '@printer/application/mappers/location.mapper';

@Injectable()
export class CreateLocationService implements ICreateLocationUseCase {
  private readonly logger = new Logger(CreateLocationService.name);

  constructor(
    @Inject('ILocationRepository')
    private readonly locationRepository: ILocationRepository,
  ) {}
  async execute(input: CreateLocationInput): Promise<CreateLocationOutput> {
    try {
      const newCep = CEP.create(input.address.cep);

      const newPhone = Phone.create(input.phone.areaCode, input.phone.phoneNumber);

      const newAddress = Address.create(
        input.address.street,
        input.address.district,
        input.address.city,
        input.address.state,
        newCep,
        input.address.reference,
      );

      const newLocation = Location.create(newAddress, newPhone, input.contact);

      const result = await this.locationRepository.create(newLocation);
      return LocationMapper.toOutput(result);
    } catch (error) {
      this.logger.log(error.message);
      if (
        error instanceof LocationDomainValidationException ||
        error instanceof AddressDomainValidationException ||
        error instanceof CepDomainValidationException ||
        error instanceof PhoneDomainValidationException
      ) {
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
