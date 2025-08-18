import { AddressProps } from '@printer/domain/types/address.props';
import { Address } from '../address';
import { CEP } from '../cep';
import { AddressDomainValidationException } from '@printer/domain/exceptions';

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
    expect(() => Address.create({ ...validAddressProps, street: '' })).toThrow(AddressDomainValidationException);
  });

  it('should throw AddressDomainValidationException if street has less than 3 characters', () => {
    expect(() => Address.create({ ...validAddressProps, street: 'Fa' })).toThrow(AddressDomainValidationException);
  });

  it('should throw AddressDomainValidationException if district is not provided', () => {
    expect(() => Address.create({ ...validAddressProps, district: '' })).toThrow(AddressDomainValidationException);
  });

  it('should throw AddressDomainValidationException if district has less than 3 characters', () => {
    expect(() => Address.create({ ...validAddressProps, district: 'Di' })).toThrow(AddressDomainValidationException);
  });

  it('should throw AddressDomainValidationException if city is not provided', () => {
    expect(() => Address.create({ ...validAddressProps, city: '' })).toThrow(AddressDomainValidationException);
  });

  it('should throw AddressDomainValidationException if city has less than 3 characters', () => {
    expect(() => Address.create({ ...validAddressProps, city: 'Ci' })).toThrow(AddressDomainValidationException);
  });

  it('should throw AddressDomainValidationException if state is not provided', () => {
    expect(() => Address.create({ ...validAddressProps, state: '' })).toThrow(AddressDomainValidationException);
  });

  it('should throw AddressDomainValidationException if state has less than 3 characters', () => {
    expect(() => Address.create({ ...validAddressProps, street: 'S' })).toThrow(AddressDomainValidationException);
  });

  it('should create a new Address without reference', () => {
    const addressWithOutReference = Address.create({
      ...validAddressProps,
      reference: '',
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
