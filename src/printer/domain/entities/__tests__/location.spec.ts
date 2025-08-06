import { MissingParamException } from '../../exceptions';
import { Location } from '../location';
import { Address } from '../value-objects/address';
import { CEP } from '../value-objects/cep';
import { Phone } from '../value-objects/phone';

const newAddress = Address.create(
  'Rua A',
  'Bairro Tal',
  'Cidade A',
  'BA',
  CEP.create('40000000'),
  'Referência da Rua A',
);

const newCellPhone = Phone.create(71, 999999999);

describe('Location', () => {
  it('should create a new location with correct params', () => {
    const newLocation = Location.create(newAddress, newCellPhone, 'Contact Location');
    expect(newLocation).toBeInstanceOf(Location);
    expect(newLocation.address).toBeInstanceOf(Address);
    expect(newLocation.address.cep).toBeInstanceOf(CEP);
    expect(newLocation.phone).toBeInstanceOf(Phone);
    expect(newLocation.address.street).toBe('Rua A');
    expect(newLocation.address.district).toBe('Bairro Tal');
    expect(newLocation.address.city).toBe('Cidade A');
    expect(newLocation.address.state).toBe('BA');
    expect(newLocation.address.cep.toString()).toBe('40000000');
  });

  it('should throw MissingParamException if Address is not provided', () => {
    const newCellPhone = Phone.create(71, 999999999);

    expect(() => Location.create(null as any, newCellPhone, 'Contact Location')).toThrow(
      new MissingParamException('Endereço não informado.'),
    );
  });

  it('should throw MissingParamException if Phone is not provided', () => {
    expect(() => Location.create(newAddress, null as any, 'Contact Location')).toThrow(
      new MissingParamException('Telefone não informado.'),
    );
  });

  it('should throw MissingParamException if contact is not provided', () => {
    expect(() => Location.create(newAddress, newCellPhone, null as any)).toThrow(
      new MissingParamException('Contato não informado.'),
    );
  });
});
