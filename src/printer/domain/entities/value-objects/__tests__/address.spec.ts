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

  it('should return error if street is null or empty', () => {
    const address = Address.create(
      '',
      'Bairro Tal',
      'Cidade A',
      'BA',
      CEP.create('40000000'),
      'Referência da Rua A',
    );

    const errors = address.validate();
    expect(errors).toContain('Nome da rua não informado.');
  });

  it('should return error if street has less than 3 characters', () => {
    const address = Address.create(
      'Ru',
      'Bairro Tal',
      'Cidade A',
      'BA',
      CEP.create('40000000'),
      'Referência da Rua A',
    );

    const errors = address.validate();
    expect(errors).toContain('Nome da rua deve conter no mínimo 3 caracteres.');
  });

  it('should return error if district is null or empty', () => {
    const address = Address.create(
      'Rua A',
      null as any,
      'Cidade A',
      'BA',
      CEP.create('40000000'),
      'Referência da Rua A',
    );

    const errors = address.validate();
    expect(errors).toContain('Bairro não informado.');
  });

  it('should return error if district has less than 3 characters', () => {
    const address = Address.create(
      'Rua A',
      'Ba',
      'Cidade A',
      'BA',
      CEP.create('40000000'),
      'Referência da Rua A',
    );

    const errors = address.validate();
    expect(errors).toContain('Bairro deve conter no mínimo 3 caracteres.');
  });

  it('should return error if city is null or empty', () => {
    const address = Address.create(
      'Rua A',
      'Bairro A',
      null as any,
      'BA',
      CEP.create('40000000'),
      'Referência da Rua A',
    );

    const errors = address.validate();
    expect(errors).toContain('Cidade não informada.');
  });

  it('should return error if city has less than 3 characters', () => {
    const address = Address.create(
      'Rua A',
      'Bairro A',
      'Ci',
      'BA',
      CEP.create('40000000'),
      'Referência da Rua A',
    );

    const errors = address.validate();
    expect(errors).toContain('Cidade deve conter no mínimo 3 caracteres.');
  });

  it('should return error if state is null or empty', () => {
    const address = Address.create(
      'Rua A',
      'Bairro A',
      'Cidade A',
      null as any,
      CEP.create('40000000'),
      'Referência da Rua A',
    );

    const errors = address.validate();
    expect(errors).toContain('Estado não informado.');
  });

  it('should return error if state has less than 2 characters or more than 3 characters', () => {
    const address = Address.create(
      'Rua A',
      'Bairro A',
      'Cidade A',
      'B',
      CEP.create('40000000'),
      'Referência da Rua A',
    );

    const errors = address.validate();
    expect(errors).toContain('Estado deve conter 2 caracteres.');
  });

  it('should create a new Address without reference', () => {
    const address = Address.create('Rua A', 'Bairro Tal', 'Cidade A', 'BA', CEP.create('40000000'));

    const errors = address.validate();
    expect(errors.length).toBe(0);
    expect(address).toBeInstanceOf(Address);
  });
});
