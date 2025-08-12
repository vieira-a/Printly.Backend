export abstract class CreateLocationInput {
  address: CreateAddressInput;
  phone: CreatePhoneInput;
  contact: string;
}

export abstract class CreateAddressInput {
  street: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  reference: string;
}

export abstract class CreatePhoneInput {
  areaCode: number;
  phoneNumber: number;
}
