import { Inject, Injectable, InternalServerErrorException, Logger, UnprocessableEntityException } from '@nestjs/common';
import { Address } from '@printer/domain/entities/value-objects/address';
import { CEP } from '@printer/domain/entities/value-objects/cep';
import { Phone } from '@printer/domain/entities/value-objects/phone';
import { IInstallationLocationRepository } from '@printer/domain/data/repositories';
import { InstallationLocationDomainValidationException } from '@printer/domain/exceptions';
import { InstallationLocationMapper } from '@printer/application/mappers/installation-location.mapper';
import { DatabaseModelException, InstallationLocationNotFoundException } from '@printer/application/exceptions';
import { IUpdateInstallationLocationUseCase } from './update-installation-location.interface';
import { UpdateInstallationLocationInput } from './input/update-installation-location.input';
import { UpdateInstallationLocationOutput } from './output/update-installation-location.output';

@Injectable()
export class UpdateInstallationLocationService implements IUpdateInstallationLocationUseCase {
  private readonly logger = new Logger(UpdateInstallationLocationService.name);

  constructor(
    @Inject('IInstallationLocationRepository')
    private readonly installationLocationRepository: IInstallationLocationRepository,
  ) {}
  async execute(id: string, input: UpdateInstallationLocationInput): Promise<UpdateInstallationLocationOutput | null> {
    try {
      const installationLocation = await this.installationLocationRepository.findById(id);
      if (!installationLocation) throw new InstallationLocationNotFoundException(id);

      if (input.address) {
        const newAddress = Address.create({
          street: input.address.street!,
          district: input.address.district!,
          city: input.address.city!,
          state: input.address.state!,
          cep: CEP.create(input.address.cep!),
          reference: input.address.reference!,
        });

        installationLocation.updateAddress(newAddress);
      }

      if (input.contact) installationLocation.updateContact(input.contact);
      if (input.phone)
        installationLocation.updatePhone(
          Phone.create({ areaCode: input.phone.areaCode!, phoneNumber: input.phone.phoneNumber! }),
        );

      const updatedLocation = await this.installationLocationRepository.update(installationLocation);

      return updatedLocation ? InstallationLocationMapper.toOutput(updatedLocation) : null;
    } catch (error: unknown) {
      if (error instanceof Error) this.logger.log(error.message);
      if (error instanceof InstallationLocationDomainValidationException) {
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
