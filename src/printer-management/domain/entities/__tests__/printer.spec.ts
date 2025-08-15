import { PrinterDomainValidationException } from '@printer/domain/exceptions/printer-domain-validation.exception';
import { Printer } from '../printer';
import { IPV4 } from '../value-objects/ipv4';
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
  describe('Validation', () => {
    describe('Create', () => {
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

      it('should throw a PrinterDomainValidationException if installationLocationId is not provided', () => {
        expect(() => Printer.create({ ...validPrinterProps, installationLocationId: '' })).toThrow(
          PrinterDomainValidationException,
        );
      });

      it('should throw a PrinterDomainValidationException if installationLocationId is not provided', () => {
        expect(() => Printer.create({ ...validPrinterProps, installedAt: null as any })).toThrow(
          PrinterDomainValidationException,
        );
      });

      it('should throw a PrinterDomainValidationException if modelId is not provided', () => {
        expect(() => Printer.create({ ...validPrinterProps, modelId: '' })).toThrow(
          PrinterDomainValidationException,
        );
      });

      it('should throw a PrinterDomainValidationException if new total print is less than current total print', () => {
        expect(() =>
          validPrinter.addCounting(
            'fake-counting-job-id',
            CountingType.MANUAL,
            999,
            9999,
            new Date(),
          ),
        ).toThrow(PrinterDomainValidationException);
      });

      it('should throw a PrinterDomainValidationException if new total copy is less than current total copy', () => {
        expect(() =>
          validPrinter.addCounting(
            'fake-counting-job-id',
            CountingType.MANUAL,
            9999,
            999,
            new Date(),
          ),
        ).toThrow(PrinterDomainValidationException);
      });

      it('should create a new Printer with correct params', () => {
        expect(validPrinter).toBeInstanceOf(Printer);
        expect(validPrinter.serialNumber).toBe('XYZ12345');
        expect(validPrinter.ipv4Address.toString()).toBe('192.168.0.200');
        expect(validPrinter.modelId).toBe('fake-model-id');
        expect(validPrinter.installationLocationId).toBe('fake-location-id');
      });
    });

    describe('Update', () => {
      it('should throw a PrinterDomainValidationException if serialNumber is not provided on update', () => {
        expect(() => validPrinter.updateSerialNumber('')).toThrow(PrinterDomainValidationException);
      });

      it('should throw a PrinterDomainValidationException if model id is not provided on update', () => {
        expect(() => validPrinter.updateModel('')).toThrow(PrinterDomainValidationException);
      });

      it('should throw a PrinterDomainValidationException if installation location id is not provided on update', () => {
        expect(() => validPrinter.updateInstallationLocation('', new Date())).toThrow(
          PrinterDomainValidationException,
        );
      });

      it('should throw a PrinterDomainValidationException if installation date is not provided on update', () => {
        expect(() =>
          validPrinter.updateInstallationLocation('fake-installation-location-id', null as any),
        ).toThrow(PrinterDomainValidationException);
      });
    });
  });

  describe('Counting', () => {
    it('should addCounting with correct params', () => {
      const newCounting = validPrinter.addCounting(
        'fake-counting-job-id',
        CountingType.MANUAL,
        9999,
        9999,
        new Date(),
      );
      expect(validPrinter.countings).toContain(newCounting);
      expect(validPrinter.totalPrint).toBe(9999);
      expect(validPrinter.totalCopy).toBe(9999);
    });

    it('should retrieve counting successfully', () => {
      const newCounting1 = validPrinter.addCounting(
        'fake-counting-job-id-1',
        CountingType.MANUAL,
        9999,
        9999,
        new Date(),
      );

      const newCounting2 = validPrinter.addCounting(
        'fake-counting-job-id-2',
        CountingType.AUTO,
        99991,
        99991,
        new Date(),
      );

      expect(validPrinter.countings).toContain(newCounting1);
      expect(validPrinter.countings).toContain(newCounting2);
    });
  });
});
