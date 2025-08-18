import { InstallationLocation } from '@printer/domain/entities';
import {
  CreateAddressOutput,
  CreateInstallationLocationOutput,
} from '../use-cases/location/create/output/create-location.output';
import { Phone } from '@printer/domain/entities/value-objects/phone';
import { CEP } from '@printer/domain/entities/value-objects/cep';

export abstract class InstallationLocationMapper {
  public static toOutput(domain: InstallationLocation): CreateInstallationLocationOutput {
    const { street, district, city, state, cep, reference } = domain.address;
    const { areaCode, phoneNumber } = domain.phone;
    const { contact, createdAt, updatedAt } = domain;

    const outputCep = CEP.create(cep.value);
    const outputAddress: CreateAddressOutput = { street, district, city, state, cep: outputCep.value, reference };
    const outputPhone = Phone.create({ areaCode, phoneNumber });

    return { address: outputAddress, phone: outputPhone.toString(), contact, createdAt, updatedAt };
  }
}
