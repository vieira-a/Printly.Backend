import { Location } from '../location';
import { Model } from '../model';
import { Printer } from '../printer';
import { Address } from '../value-objects/address';
import { CEP } from '../value-objects/cep';
import { Phone } from '../value-objects/phone';

const newModel = Model.create(
  'Kyocera',
  'KM2040DN',
  '1.2.1.2.3.5.6.7.41.10',
  '1.2.1.2.3.5.6.7.41.11',
);

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

describe('Printer', () => {
  it('should create a new Printer with correct params', () => {
    const newPrinter = Printer.create(newModel, 'XYZ12345', '192.168.0.200', newLocation);

    expect(newPrinter).toBeInstanceOf(Printer);
  });
});
