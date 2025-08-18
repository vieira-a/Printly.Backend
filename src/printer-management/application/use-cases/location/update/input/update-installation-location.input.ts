export abstract class UpdateInstallationLocationInput {
  address?: UpdateAddressInput;
  phone?: UpdatePhoneInput;
  contact?: string;
}

export abstract class UpdateAddressInput {
  street?: string;
  district?: string;
  city?: string;
  state?: string;
  cep?: string;
  reference?: string;
}

export abstract class UpdatePhoneInput {
  areaCode?: number;
  phoneNumber?: number;
}
