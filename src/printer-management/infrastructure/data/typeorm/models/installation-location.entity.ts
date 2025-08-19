import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity';
import {
  CreateInstallationLocationEntityProps,
  InstallationLocationEntityProps,
} from '@printer/domain/types/installation-location.props';

@Entity({ name: 'installation_locations' })
export class InstallationLocationEntity extends BaseEntity {
  @Column({ name: 'street', type: 'varchar', length: 255 })
  street: string;

  @Column({ name: 'district', type: 'varchar', length: 100 })
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

  @Column({ name: 'departament', type: 'varchar' })
  departament: string;

  @Column({ name: 'contact', type: 'varchar' })
  contact: string;

  constructor(props?: InstallationLocationEntityProps) {
    super(props?.id, props?.createdAt, props?.updatedAt);
    if (props) {
      this.street = props.street;
      this.district = props.district;
      this.city = props.city;
      this.state = props.state;
      this.cep = props.cep;
      this.reference = props.reference;
      this.areaCode = props.areaCode;
      this.phoneNumber = props.phoneNumber;
      this.departament = props.departament;
      this.contact = props.contact;
    }
  }

  public static create(props: CreateInstallationLocationEntityProps): InstallationLocationEntity {
    return new InstallationLocationEntity({ ...props });
  }

  public static restore(props: InstallationLocationEntityProps): InstallationLocationEntity {
    return new InstallationLocationEntity({ ...props });
  }
}
