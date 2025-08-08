import {
  AddressDomainValidationException,
  InvalidParamException,
  MissingParamException,
} from '../../../exceptions';
import { Address } from '../address';
import { CEP } from '../cep';

describe('Address Value Object', () => {
  it('should create a new Address with correct params', () => {
    const newAddress = Address.create(
      'Rua A',
      'Bairro Tal',
      'Cidade A',
      'BA',
      CEP.create('40000000'),
      'Referência da Rua A',
    );

    expect(newAddress).toBeInstanceOf(Address);
    expect(newAddress.street).toBe('Rua A');
    expect(newAddress.district).toBe('Bairro Tal');
    expect(newAddress.city).toBe('Cidade A');
    expect(newAddress.state).toBe('BA');
    expect(newAddress.cep.toString()).toBe('40000000');
    expect(newAddress.reference).toBe('Referência da Rua A');
  });

  it('should throw MissingParamException if street is not provided', () => {
    expect(() =>
      Address.create(
        null as any,
        'Bairro Tal',
        'Cidade A',
        'BA',
        CEP.create('40000000'),
        'Referência da Rua A',
      ),
    ).toThrow(AddressDomainValidationException);
  });

  it('should throw InvalidParamException if street has less than 3 characters', () => {
    expect(() =>
      Address.create(
        'Ru',
        'Bairro Tal',
        'Cidade A',
        'BA',
        CEP.create('40000000'),
        'Referência da Rua A',
      ),
    ).toThrow(AddressDomainValidationException);
  });

  it('should throw InvalidParamException if street is empty', () => {
    expect(() =>
      Address.create(
        '',
        'Bairro Tal',
        'Cidade A',
        'BA',
        CEP.create('40000000'),
        'Referência da Rua A',
      ),
    ).toThrow(AddressDomainValidationException);
  });

  it('should throw MissingParamException if district is not provided', () => {
    expect(() =>
      Address.create(
        'Rua A',
        null as any,
        'Cidade A',
        'BA',
        CEP.create('40000000'),
        'Referência da Rua A',
      ),
    ).toThrow(AddressDomainValidationException);
  });

  it('should throw InvalidParamException if district has less than 3 characters', () => {
    expect(() =>
      Address.create(
        'Rua A',
        'Ba',
        'Cidade A',
        'BA',
        CEP.create('40000000'),
        'Referência da Rua A',
      ),
    ).toThrow(AddressDomainValidationException);
  });

  it('should throw InvalidParamException if district is empty', () => {
    expect(() =>
      Address.create('Rua A', '', 'Cidade A', 'BA', CEP.create('40000000'), 'Referência da Rua A'),
    ).toThrow(AddressDomainValidationException);
  });

  it('should throw MissingParamException if city is not provided', () => {
    expect(() =>
      Address.create(
        'Rua A',
        'Bairro A',
        null as any,
        'BA',
        CEP.create('40000000'),
        'Referência da Rua A',
      ),
    ).toThrow(AddressDomainValidationException);
  });

  it('should throw InvalidParamException if city has less than 3 characters', () => {
    expect(() =>
      Address.create(
        'Rua A',
        'Bairro A',
        'Ci',
        'BA',
        CEP.create('40000000'),
        'Referência da Rua A',
      ),
    ).toThrow(AddressDomainValidationException);
  });

  it('should throw InvalidParamException if city is empty', () => {
    expect(() =>
      Address.create('Rua A', 'Bairro A', '', 'BA', CEP.create('40000000'), 'Referência da Rua A'),
    ).toThrow(AddressDomainValidationException);
  });

  it('should throw MissingParamException if state is not provided', () => {
    expect(() =>
      Address.create(
        'Rua A',
        'Bairro A',
        'Cidade A',
        null as any,
        CEP.create('40000000'),
        'Referência da Rua A',
      ),
    ).toThrow(AddressDomainValidationException);
  });

  it('should throw InvalidParamException if state has less than 2 characters or more than 3 characters', () => {
    expect(() =>
      Address.create(
        'Rua A',
        'Bairro A',
        'Cidade A',
        'B',
        CEP.create('40000000'),
        'Referência da Rua A',
      ),
    ).toThrow(AddressDomainValidationException);
  });

  it('should throw InvalidParamException if state is empty', () => {
    expect(() =>
      Address.create(
        'Rua A',
        'Bairro A',
        'Cidade A',
        '',
        CEP.create('40000000'),
        'Referência da Rua A',
      ),
    ).toThrow(AddressDomainValidationException);
  });

  it('should throw InvalidParamException if state is empty', () => {
    expect(() =>
      Address.create(
        'Rua A',
        'Bairro A',
        'Cidade A',
        '',
        CEP.create('40000000'),
        'Referência da Rua A',
      ),
    ).toThrow(AddressDomainValidationException);
  });

  it('should create a new Address without reference', () => {
    const newAddressWithoutReference = Address.create(
      'Rua A',
      'Bairro Tal',
      'Cidade A',
      'BA',
      CEP.create('40000000'),
    );

    expect(newAddressWithoutReference).toBeInstanceOf(Address);
  });
});
