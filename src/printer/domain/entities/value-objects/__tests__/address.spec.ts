import { InvalidParamException, MissingParamException } from '../../../exceptions';
import { Address } from '../address';

describe('Address', () => {
  it('should create a new Address with correct params', () => {
    const newAddress = Address.create(
      'Rua A',
      'Bairro Tal',
      'Cidade A',
      'Estado A',
      '40000000',
      'Referência da Rua A',
    );

    expect(newAddress).toBeInstanceOf(Address);
    expect(newAddress.street).toBe('Rua A');
    expect(newAddress.district).toBe('Bairro Tal');
    expect(newAddress.city).toBe('Cidade A');
    expect(newAddress.state).toBe('Estado A');
    expect(newAddress.cep).toBe('40000000');
    expect(newAddress.reference).toBe('Referência da Rua A');
  });

  it('should throw MissingParamException if street is not provided', () => {
    expect(() =>
      Address.create(
        null as any,
        'Bairro Tal',
        'Cidade A',
        'Estado A',
        '40000000',
        'Referência da Rua A',
      ),
    ).toThrow(new MissingParamException('Nome da rua não informado.'));
  });

  it('should throw InvalidParamException if street has less than 3 characters', () => {
    expect(() =>
      Address.create('Ru', 'Bairro Tal', 'Cidade A', 'Estado A', '40000000', 'Referência da Rua A'),
    ).toThrow(new InvalidParamException('Nome da rua deve conter no mínimo 3 caracteres.'));
  });

  it('should throw InvalidParamException if street is empty', () => {
    expect(() =>
      Address.create('', 'Bairro Tal', 'Cidade A', 'Estado A', '40000000', 'Referência da Rua A'),
    ).toThrow(new InvalidParamException('Nome da rua não informado.'));
  });

  it('should throw MissingParamException if district is not provided', () => {
    expect(() =>
      Address.create(
        'Rua A',
        null as any,
        'Cidade A',
        'Estado A',
        '40000000',
        'Referência da Rua A',
      ),
    ).toThrow(new MissingParamException('Bairro não informado.'));
  });

  it('should throw InvalidParamException if district has less than 3 characters', () => {
    expect(() =>
      Address.create('Rua A', 'Ba', 'Cidade A', 'Estado A', '40000000', 'Referência da Rua A'),
    ).toThrow(new InvalidParamException('Bairro deve conter no mínimo 3 caracteres.'));
  });

  it('should throw InvalidParamException if district is empty', () => {
    expect(() =>
      Address.create('Rua A', '', 'Cidade A', 'Estado A', '40000000', 'Referência da Rua A'),
    ).toThrow(new InvalidParamException('Bairro não informado.'));
  });

  it('should throw MissingParamException if city is not provided', () => {
    expect(() =>
      Address.create(
        'Rua A',
        'Bairro A',
        null as any,
        'Estado A',
        '40000000',
        'Referência da Rua A',
      ),
    ).toThrow(new MissingParamException('Cidade não informada.'));
  });

  it('should throw InvalidParamException if city has less than 3 characters', () => {
    expect(() =>
      Address.create('Rua A', 'Bairro A', 'Ci', 'Estado A', '40000000', 'Referência da Rua A'),
    ).toThrow(new InvalidParamException('Cidade deve conter no mínimo 3 caracteres.'));
  });

  it('should throw InvalidParamException if city is empty', () => {
    expect(() =>
      Address.create('Rua A', 'Bairro A', '', 'Estado A', '40000000', 'Referência da Rua A'),
    ).toThrow(new InvalidParamException('Cidade não informada.'));
  });
});
