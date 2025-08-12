export abstract class CreateLocationOutput {
  address: CreateAddressOutput;
  phone: string;
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
