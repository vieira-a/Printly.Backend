import { Inject, Injectable, InternalServerErrorException, Logger, UnprocessableEntityException } from '@nestjs/common';
import { IInstallationLocationRepository } from '@printer/domain/data/repositories';
import {
  AddressDomainValidationException,
  CepDomainValidationException,
  InstallationLocationDomainValidationException,
  PhoneDomainValidationException,
} from '@printer/domain/exceptions';
import { InstallationLocation } from '@printer/domain/entities';
import { Address } from '@printer/domain/entities/value-objects/address';
import { CEP } from '@printer/domain/entities/value-objects/cep';
import { Phone } from '@printer/domain/entities/value-objects/phone';
import { DatabaseModelException } from '@printer/application/exceptions';
import { InstallationLocationMapper } from '@printer/application/mappers/installation-location.mapper';
import { ICreateInstallationLocationUseCase } from './create-installation-location.interface';
import { CreateInstallationLocationInput } from './input/create-location.input';
import { CreateInstallationLocationOutput } from './output/create-location.output';

@Injectable()
export class CreateInstallationLocationService implements ICreateInstallationLocationUseCase {
  private readonly logger = new Logger(CreateInstallationLocationService.name);

  constructor(
    @Inject('IInstallationLocationRepository')
    private readonly locationRepository: IInstallationLocationRepository,
  ) {}
  async execute(input: CreateInstallationLocationInput): Promise<CreateInstallationLocationOutput> {
    const { street, district, city, state, cep, reference } = input.address;
    const { areaCode, phoneNumber } = input.phone;
    const { contact } = input;

    try {
      const newCep = CEP.create(cep);
      const newPhone = Phone.create({ areaCode, phoneNumber });
      const newAddress = Address.create({ street, district, city, state, cep: newCep, reference });

      const newLocation = InstallationLocation.create({ address: newAddress, phone: newPhone, contact });

      const result = await this.locationRepository.create(newLocation);
      return InstallationLocationMapper.toOutput(result);
    } catch (error: unknown) {
      if (error instanceof Error) this.logger.log(error.message);
      if (
        error instanceof InstallationLocationDomainValidationException ||
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
