import { Column, Entity } from 'typeorm';
import { BaseModel } from './base-model';

interface LocationProps {
  street: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  reference?: string;
  areaCode: number;
  phoneNumber: number;
  contact: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Entity({ name: 'locations' })
export class LocationModel extends BaseModel {
  @Column({ name: 'street' })
  street: string;

  @Column({ name: 'district', type: 'varchar', length: 30 })
  district: string;

  @Column({ name: 'city', type: 'varchar', length: 30 })
  city: string;

  @Column({ name: 'state', type: 'char', length: 2 })
  state: string;

  @Column({ name: 'cep', type: 'char', length: 8 })
  cep: string;

  @Column({ name: 'reference', type: 'varchar', length: 120, nullable: true })
  reference?: string;

  @Column({ name: 'areaCode', type: 'char', length: 2 })
  areaCode: number;

  @Column({ name: 'phoneNumber', type: 'char', length: 9 })
  phoneNumber: number;

  @Column({ name: 'contact', type: 'varchar' })
  contact: string;

  constructor(props?: LocationProps) {
    super(props?.id, props?.createdAt, props?.updatedAt);
    if (props) {
      this.street = props?.street;
      this.district = props.district;
      this.city = props.city;
      this.state = props.state;
      this.cep = props.cep;
      this.reference = props.reference;
      this.areaCode = props.areaCode;
      this.phoneNumber = props.phoneNumber;
      this.contact = props.contact;
    }
  }

  public static create(
    street: string,
    district: string,
    city: string,
    state: string,
    cep: string,
    reference: string,
    areaCode: number,
    phoneNumber: number,
    contact: string,
  ): LocationModel {
    return new LocationModel({
      street,
      district,
      city,
      state,
      cep,
      reference,
      areaCode,
      phoneNumber,
      contact,
    });
  }

  public static restore(
    id: string,
    street: string,
    district: string,
    city: string,
    state: string,
    cep: string,
    reference: string | undefined,
    areaCode: number,
    phoneNumber: number,
    contact: string,
    createdAt: Date,
    updatedAt: Date,
  ): LocationModel {
    return new LocationModel({
      id,
      street,
      district,
      city,
      state,
      cep,
      reference,
      areaCode,
      phoneNumber,
      contact,
      createdAt,
      updatedAt,
    });
  }
}
