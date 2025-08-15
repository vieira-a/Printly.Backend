import { Injectable } from '@nestjs/common';
import { Location } from '../entities';
import { Address } from '../entities/value-objects/address';
import { CEP } from '../entities/value-objects/cep';
import { Phone } from '../entities/value-objects/phone';

interface UpdateLocationData {
  address?: Partial<{
    street: string;
    district: string;
    city: string;
    state: string;
    cep: string;
    reference?: string;
  }>;
  phone?: Partial<{
    areaCode: number;
    phoneNumber: number;
  }>;
  contact?: string;
}

@Injectable()
export class UpdateLocationDetails {
  update(location: Location, data: UpdateLocationData): Location {
    const newAddress = data.address
      ? Address.create(
          data.address.street ?? location.address.street,
          data.address.district ?? location.address.district,
          data.address.city ?? location.address.city,
          data.address.state ?? location.address.state,
          CEP.create(data.address.cep ?? location.address.cep.value),
          data.address.reference ?? location.address.reference,
        )
      : location.address;

    const newPhone = data.phone
      ? Phone.create(
          data.phone.areaCode ?? location.phone.areaCode,
          data.phone.phoneNumber ?? location.phone.phoneNumber,
        )
      : location.phone;

    const newContact = data.contact ?? location.contact;

    return Location.restore(
      location.id,
      newAddress,
      newPhone,
      newContact,
      location.createdAt,
      new Date(),
    );
  }
}
