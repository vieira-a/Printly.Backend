export abstract class CreateInstallationLocationOutput {
  address: CreateAddressOutput;
  phone: string;
  departament: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class CreateAddressOutput {
  street: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  reference?: string;
}
