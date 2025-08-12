import { PrinterDomainValidationException } from '@printer/domain/exceptions/printer-domain-validation.exception';
import { Location } from '../location';
import { Model } from '../model';
import { Printer } from '../printer';
import { Address } from '../value-objects/address';
import { CEP } from '../value-objects/cep';
import { IPV4 } from '../value-objects/ipv4';
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

describe('Printer Entity', () => {
  it('should create a new Printer with correct params', () => {
    const newPrinter = Printer.create(
      newModel,
      'XYZ12345',
      IPV4.create('192.168.0.200'),
      newLocation,
      new Date(),
    );

    expect(newPrinter).toBeInstanceOf(Printer);
  });

  it('should throw a MissingParamException if model is not provided', () => {
    expect(() =>
      Printer.create(
        null as any,
        'XYZ12345',
        IPV4.create('192.168.0.200'),
        newLocation,
        new Date(),
      ),
    ).toThrow(PrinterDomainValidationException);
  });

  it('should throw a MissingParamException if serial is not provided', () => {
    expect(() =>
      Printer.create(newModel, null as any, IPV4.create('192.168.0.200'), newLocation, new Date()),
    ).toThrow(PrinterDomainValidationException);
  });

  it('should throw a MissingParamException if serial is empty', () => {
    expect(() =>
      Printer.create(newModel, '', IPV4.create('192.168.0.200'), newLocation, new Date()),
    ).toThrow(PrinterDomainValidationException);
  });

  it('should throw a MissingParamException if serial has less than 6 characters', () => {
    expect(() =>
      Printer.create(newModel, 'XYZ99', IPV4.create('192.168.0.200'), newLocation, new Date()),
    ).toThrow(PrinterDomainValidationException);
  });
});
