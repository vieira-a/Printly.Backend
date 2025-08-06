import { MissingParamException } from '../../../exceptions';
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

  it('should throw MissingParamException if Manufacturer is not provided', () => {
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
});
