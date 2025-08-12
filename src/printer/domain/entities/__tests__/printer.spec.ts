import { PrinterDomainValidationException } from '@printer/domain/exceptions/printer-domain-validation.exception';
import { Location } from '../location';
import { Model } from '../model';
import { Printer } from '../printer';
import { Address } from '../value-objects/address';
import { CEP } from '../value-objects/cep';
import { IPV4 } from '../value-objects/ipv4';
import { Phone } from '../value-objects/phone';
import { Counting } from '../counting';
import { CountingDomainValidationException } from '@printer/domain/exceptions';

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

const newValidPrinter = Printer.create(
  newModel,
  'XYZ12345',
  IPV4.create('192.168.0.200'),
  newLocation,
  new Date(),
  1000,
  1000,
);

describe('Printer Entity', () => {
  it('should create a new Printer with correct params', () => {
    const newPrinter = Printer.create(
      newModel,
      'XYZ12345',
      IPV4.create('192.168.0.200'),
      newLocation,
      new Date(),
      1000,
      1000,
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
        1000,
        1000,
      ),
    ).toThrow(PrinterDomainValidationException);
  });

  it('should throw a MissingParamException if serial is not provided', () => {
    expect(() =>
      Printer.create(
        newModel,
        null as any,
        IPV4.create('192.168.0.200'),
        newLocation,
        new Date(),
        1000,
        1000,
      ),
    ).toThrow(PrinterDomainValidationException);
  });

  it('should throw a MissingParamException if serial is empty', () => {
    expect(() =>
      Printer.create(
        newModel,
        '',
        IPV4.create('192.168.0.200'),
        newLocation,
        new Date(),
        1000,
        1000,
      ),
    ).toThrow(PrinterDomainValidationException);
  });

  it('should throw a MissingParamException if serial has less than 6 characters', () => {
    expect(() =>
      Printer.create(
        newModel,
        'XYZ99',
        IPV4.create('192.168.0.200'),
        newLocation,
        new Date(),
        1000,
        1000,
      ),
    ).toThrow(PrinterDomainValidationException);
  });

  it('should throw PrinterDomainValidationException if new total print is not provided', () => {
    expect(() => newValidPrinter.registerCounting(null as any, 9999, new Date())).toThrow(
      PrinterDomainValidationException,
    );
  });

  it('should throw PrinterDomainValidationException if new total print is less than current total print', () => {
    expect(() => newValidPrinter.registerCounting(999, 9999, new Date())).toThrow(
      PrinterDomainValidationException,
    );
  });

  it('should throw PrinterDomainValidationException if new total copy is less than current total copy', () => {
    expect(() => newValidPrinter.registerCounting(9999, 999, new Date())).toThrow(
      PrinterDomainValidationException,
    );
  });

  it('should throw CountingDomainValidationException if printerId is not provider', () => {
    const totalPrint = 9999;
    const totalCopy = 9999;
    const countingDate = new Date();

    newValidPrinter.registerCounting(totalPrint, totalCopy, countingDate);
    expect(() => Counting.create(null as any, totalPrint, totalCopy, countingDate)).toThrow(
      CountingDomainValidationException,
    );
  });

  it('should throw CountingDomainValidationException if printerId is not provider', () => {
    const totalPrint = 9999;
    const totalCopy = 9999;
    const countingDate = new Date();

    newValidPrinter.registerCounting(totalPrint, totalCopy, countingDate);
    expect(() =>
      Counting.create('0b8565bb-f5c7-4510-9f43-f6067a9d9924', totalPrint, totalCopy, null as any),
    ).toThrow(CountingDomainValidationException);
  });
});
