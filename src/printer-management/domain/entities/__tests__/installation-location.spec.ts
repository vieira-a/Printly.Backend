import { CreateInstallationLocationProps } from '@printer/domain/types/installation-location.props';
import { InstallationLocationDomainValidationException } from '../../exceptions';
import { InstallationLocation } from '../installation-location';
import { Address } from '../value-objects/address';
import { CEP } from '../value-objects/cep';
import { Phone } from '../value-objects/phone';

const validCep = CEP.create('12345678');
const validPhone = Phone.create({ areaCode: 71, phoneNumber: 999998888 });
const validAddress = Address.create({
  street: 'fake-street',
  district: 'fake-district',
  city: 'fake-city',
  state: 'FK',
  cep: validCep,
  reference: 'fake-reference',
});

const validInstallationLocationProps: CreateInstallationLocationProps = {
  address: validAddress,
  phone: validPhone,
  contact: 'fake-contact',
};

describe('Location Entity', () => {
  it('should create a new location with correct params', () => {
    const newLocation = InstallationLocation.create({ ...validInstallationLocationProps });
    expect(newLocation).toBeInstanceOf(InstallationLocation);
    expect(newLocation.address).toBeInstanceOf(Address);
    expect(newLocation.address.cep).toBeInstanceOf(CEP);
    expect(newLocation.phone).toBeInstanceOf(Phone);
    expect(newLocation.address.street).toBe('fake-street');
    expect(newLocation.address.district).toBe('fake-district');
    expect(newLocation.address.city).toBe('fake-city');
    expect(newLocation.address.state).toBe('FK');
    expect(newLocation.address.cep.value).toBe('12345678');
    expect(newLocation.address.reference).toBe('fake-reference');
  });

  it('should throw InstallationLocationDomainValidationException if address is not provided', () => {
    expect(() =>
      InstallationLocation.create({ ...validInstallationLocationProps, address: null as any }),
    ).toThrow(InstallationLocationDomainValidationException);
  });

  it('should throw InstallationLocationDomainValidationException if phone is not provided', () => {
    expect(() =>
      InstallationLocation.create({ ...validInstallationLocationProps, phone: null as any }),
    ).toThrow(InstallationLocationDomainValidationException);
  });

  it('should throw InstallationLocationDomainValidationException if contact is not provided', () => {
    expect(() =>
      InstallationLocation.create({ ...validInstallationLocationProps, contact: '' }),
    ).toThrow(InstallationLocationDomainValidationException);
  });

  it('should throw InstallationLocationDomainValidationException if contact has less than 3 characters', () => {
    expect(() =>
      InstallationLocation.create({ ...validInstallationLocationProps, contact: 'Co' }),
    ).toThrow(InstallationLocationDomainValidationException);
  });
});
