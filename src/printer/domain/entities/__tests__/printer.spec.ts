import { InvalidParamException, MissingParamException } from '../../exceptions';
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

  it('should throw a MissingParamException if model is not provided', () => {
    expect(() => Printer.create(null as any, 'XYZ12345', '192.168.0.200', newLocation)).toThrow(
      new MissingParamException('Modelo não informado.'),
    );
  });

  it('should throw a MissingParamException if serial is not provided', () => {
    expect(() => Printer.create(newModel, null as any, '192.168.0.200', newLocation)).toThrow(
      new MissingParamException('Serial não informado.'),
    );
  });

  it('should throw a MissingParamException if serial is empty', () => {
    expect(() => Printer.create(newModel, '', '192.168.0.200', newLocation)).toThrow(
      new InvalidParamException('Serial não informado.'),
    );
  });

  it('should throw a MissingParamException if serial has less than 6 characters', () => {
    expect(() => Printer.create(newModel, 'XYZ99', '192.168.0.200', newLocation)).toThrow(
      new InvalidParamException('Serial deve ter no mínimo 6 caracteres.'),
    );
  });
});
