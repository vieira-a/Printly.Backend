import { Location } from '@printer/domain/entities';
import { Address } from '@printer/domain/entities/value-objects/address';
import { Phone } from '@printer/domain/entities/value-objects/phone';
import { CEP } from '@printer/domain/entities/value-objects/cep';
import { LocationModel } from '../typeorm/models/location.model';

export abstract class LocationDataMapper {
  public static toDomain(model: LocationModel): Location {
    const address = Address.create(
      model.street,
      model.district,
      model.city,
      model.state,
      CEP.create(model.cep),
      model.reference,
    );

    return Location.restore(
      model.id,
      address,
      Phone.create(model.areaCode, model.phoneNumber),
      model.contact,
      model.createdAt,
      model.updatedAt,
    );
  }

  public static toModel(domain: Location): LocationModel {
    return LocationModel.restore(
      domain.id,
      domain.address.street,
      domain.address.district,
      domain.address.city,
      domain.address.state,
      domain.address.cep.toString(),
      domain.address.reference,
      domain.phone.areaCode,
      domain.phone.phoneNumber,
      domain.contact,
      domain.createdAt,
      domain.updatedAt,
    );
  }
}
