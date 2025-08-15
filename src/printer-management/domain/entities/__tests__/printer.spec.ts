import { PrinterDomainValidationException } from '@printer/domain/exceptions/printer-domain-validation.exception';
import { Printer } from '../printer';
import { IPV4 } from '../value-objects/ipv4';
import { Counting } from '../counting';
import { CountingDomainValidationException } from '@printer/domain/exceptions';
import { CountingType } from '@printer/domain/enums/counting-type.enum';
import { CreatePrinterProps } from '@printer/domain/types/printer.props';

const validPrinterProps: CreatePrinterProps = {
  serialNumber: 'XYZ12345',
  ipv4Address: IPV4.create('192.168.0.200'),
  modelId: 'fake-model-id',
  installationLocationId: 'fake-location-id',
  installedAt: new Date(),
  totalPrint: 1000,
  totalCopy: 1000,
};

const validPrinter = Printer.create({ ...validPrinterProps });

describe('Printer Entity', () => {
  it('should create a new Printer with correct params', () => {
    expect(validPrinter).toBeInstanceOf(Printer);
    expect(validPrinter.serialNumber).toBe('XYZ12345');
  });

  it('should throw a PrinterDomainValidationException if serialNumber is not provided', () => {
    expect(() => Printer.create({ ...validPrinterProps, serialNumber: '' })).toThrow(
      PrinterDomainValidationException,
    );
  });

  it('should throw a PrinterDomainValidationException if serialNumber has less than 6 characters', () => {
    expect(() => Printer.create({ ...validPrinterProps, serialNumber: 'XYZ' })).toThrow(
      PrinterDomainValidationException,
    );
  });

  it('should throw a PrinterDomainValidationException if modelId is not provided', () => {
    expect(() => Printer.create({ ...validPrinterProps, modelId: '' })).toThrow(
      PrinterDomainValidationException,
    );
  });

  it('should throw a PrinterDomainValidationException if new total print is not provided', () => {
    const validPrinter = Printer.create({ ...validPrinterProps });

    expect(() =>
      validPrinter.addCounting(null as any, 9999, new Date(), CountingType.MANUAL),
    ).toThrow(PrinterDomainValidationException);
  });

  it('should throw a PrinterDomainValidationException if new total copy is not provided', () => {
    expect(() =>
      validPrinter.addCounting(9999, null as any, new Date(), CountingType.MANUAL),
    ).toThrow(PrinterDomainValidationException);
  });

  it('should throw a PrinterDomainValidationException if new total print is less than current total print', () => {
    expect(() => validPrinter.addCounting(999, 9999, new Date(), CountingType.MANUAL)).toThrow(
      PrinterDomainValidationException,
    );
  });

  it('should throw a PrinterDomainValidationException if new total copy is less than current total copy', () => {
    expect(() => validPrinter.addCounting(9999, 999, new Date(), CountingType.MANUAL)).toThrow(
      PrinterDomainValidationException,
    );
  });
});
