import type { Location } from '@printer/domain/entities';
import type { CreateLocationOutput } from '../use-cases/location/create/output/create-location.output';

export abstract class LocationMapper {
  public static toOutput(entity: Location): CreateLocationOutput {
    return {
      address: {
        street: entity.address.street,
        district: entity.address.district,
        city: entity.address.city,
        state: entity.address.state,
        cep: entity.address.cep.toString(),
        reference: entity.address.reference,
      },
      phone: entity.phone.toString(),
      contact: entity.contact,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
