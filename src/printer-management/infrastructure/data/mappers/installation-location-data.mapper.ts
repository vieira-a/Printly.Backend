import { InstallationLocation } from '@printer/domain/entities';
import { Address } from '@printer/domain/entities/value-objects/address';
import { Phone } from '@printer/domain/entities/value-objects/phone';
import { CEP } from '@printer/domain/entities/value-objects/cep';
import { InstallationLocationEntity } from '../typeorm/models/installation-location.entity';

export abstract class InstallationLocationDataMapper {
  public static toDomain(entity: InstallationLocationEntity): InstallationLocation {
    const address = Address.create({
      street: entity.street,
      district: entity.district,
      city: entity.city,
      state: entity.state,
      cep: CEP.create(entity.cep),
      reference: entity.reference,
    });

    const phone = Phone.create({ areaCode: entity.areaCode, phoneNumber: entity.phoneNumber });

    return InstallationLocation.restore({
      id: entity.id,
      address,
      phone,
      departament: entity.departament,
      contact: entity.contact,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  public static toEntity(domain: InstallationLocation): InstallationLocationEntity {
    return InstallationLocationEntity.create({
      street: domain.address.street,
      district: domain.address.district,
      city: domain.address.city,
      state: domain.address.state,
      cep: domain.address.cep.value,
      reference: domain.address.reference,
      areaCode: domain.phone.areaCode,
      phoneNumber: domain.phone.phoneNumber,
      departament: domain.departament,
      contact: domain.contact,
    });
  }
}
