import { Location } from '../location';
import { Address } from '../value-objects/address';
import { CEP } from '../value-objects/cep';
import { Phone } from '../value-objects/phone';

describe('Location', () => {
  it('should create a new location with correct params', () => {
    const newAddress = Address.create(
      'Rua A',
      'Bairro Tal',
      'Cidade A',
      'BA',
      CEP.create('40000000'),
      'Referência da Rua A',
    );

    const newCellPhone = Phone.create(71, 999999999);
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
});
