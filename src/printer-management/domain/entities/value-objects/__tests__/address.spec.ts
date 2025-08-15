import { AddressProps } from '@printer/domain/types/address.props';
import { Address } from '../address';
import { CEP } from '../cep';

const validCep = CEP.create('12345678');

const validAddressProps: AddressProps = {
  street: 'fake-street',
  district: 'fake-district',
  city: 'fake-city',
  state: 'FK',
  cep: validCep,
  reference: 'fake-reference',
};

const validAddress = Address.create({ ...validAddressProps });

describe('Address Value Object', () => {
  it('should create a new Address with correct params', () => {
    expect(validAddress).toBeInstanceOf(Address);
    expect(validAddress.street).toBe('fake-street');
    expect(validAddress.district).toBe('fake-district');
    expect(validAddress.city).toBe('fake-city');
    expect(validAddress.state).toBe('FK');
    expect(validAddress.cep.value).toBe('12345678');
    expect(validAddress.reference).toBe('fake-reference');
  });

  it('should throw AddressDomainValidationException if street is not provided', () => {
    expect(() => Address.create);
    const address = Address.create({ ...validAddressProps, street: '' });
  });

  it('should throw AddressDomainValidationException if street has less than 3 characters', () => {
    expect(() => Address.create);
    const address = Address.create({ ...validAddressProps, street: 'Fa' });
  });

  it('should throw AddressDomainValidationException if district is not provided', () => {
    expect(() => Address.create);
    const address = Address.create({ ...validAddressProps, district: '' });
  });

  it('should throw AddressDomainValidationException if district has less than 3 characters', () => {
    expect(() => Address.create);
    const address = Address.create({ ...validAddressProps, district: 'Di' });
  });

  it('should throw AddressDomainValidationException if city is not provided', () => {
    expect(() => Address.create);
    const address = Address.create({ ...validAddressProps, city: '' });
  });

  it('should throw AddressDomainValidationException if city has less than 3 characters', () => {
    expect(() => Address.create);
    const address = Address.create({ ...validAddressProps, city: 'Ci' });
  });

  it('should throw AddressDomainValidationException if state is not provided', () => {
    expect(() => Address.create);
    const address = Address.create({ ...validAddressProps, state: '' });
  });

  it('should throw AddressDomainValidationException if state has less than 3 characters', () => {
    expect(() => Address.create);
    const address = Address.create({ ...validAddressProps, state: 'St' });
  });

  it('should create a new Address without reference', () => {
    const addressWithOutReference = Address.create({
      ...validAddressProps,
      reference: null as any,
    });
    expect(addressWithOutReference).toBeInstanceOf(Address);
    expect(addressWithOutReference.street).toBe('fake-street');
    expect(addressWithOutReference.district).toBe('fake-district');
    expect(addressWithOutReference.city).toBe('fake-city');
    expect(addressWithOutReference.state).toBe('FK');
    expect(addressWithOutReference.cep.value).toBe('12345678');
    expect(addressWithOutReference.reference).toBeFalsy();
  });
});
