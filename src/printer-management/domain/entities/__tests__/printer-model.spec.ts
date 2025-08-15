import { ModelDomainValidationException } from '@printer/domain/exceptions';
import { PrinterModel } from '../printer-model';
import { CreatePrinterModelProps } from '@printer/domain/types/printer-model.props';

const validPrinterModel: CreatePrinterModelProps = {
  manufacturer: 'Kyocera',
  description: 'KM2040DN',
  printOid: '1.2.1.2.3.5.6.7.41.10',
  copyOid: '1.2.1.2.3.5.6.7.41.11',
};

describe('PrinterModel Entity', () => {
  it('should create a new PrinterModel with correct params', () => {
    const newModel = PrinterModel.create({ ...validPrinterModel });

    expect(newModel).toBeInstanceOf(PrinterModel);
    expect(newModel.id).toBeDefined();
    expect(newModel.manufacturer).toBe('Kyocera');
    expect(newModel.description).toBe('KM2040DN');
    expect(newModel.printOid).toBe('1.2.1.2.3.5.6.7.41.10');
    expect(newModel.copyOid).toBe('1.2.1.2.3.5.6.7.41.11');
    expect(newModel.createdAt).toBeInstanceOf(Date);
    expect(newModel.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw ModelDomainValidationException if manufacturer is not provided', () => {
    expect(() => PrinterModel.create({ ...validPrinterModel, manufacturer: '' })).toThrow(
      ModelDomainValidationException,
    );
  });

  it('should throw ModelDomainValidationException if manufacturer has less than 3 characters', () => {
    expect(() => PrinterModel.create({ ...validPrinterModel, manufacturer: 'Ky' })).toThrow(
      ModelDomainValidationException,
    );
  });

  it('should throw ModelDomainValidationException if description is not provided', () => {
    expect(() => PrinterModel.create({ ...validPrinterModel, description: '' })).toThrow(
      ModelDomainValidationException,
    );
  });

  it('should throw ModelDomainValidationException if description is less than 3 characters', () => {
    expect(() => PrinterModel.create({ ...validPrinterModel, description: 'KM' })).toThrow(
      ModelDomainValidationException,
    );
  });

  it('should throw ModelDomainValidationException if printOid is not provided', () => {
    expect(() => PrinterModel.create({ ...validPrinterModel, printOid: '' })).toThrow(
      ModelDomainValidationException,
    );
  });

  it('should throw ModelDomainValidationException if printOid is less than 10 characters', () => {
    expect(() => PrinterModel.create({ ...validPrinterModel, printOid: '1.2.3.4.5' })).toThrow(
      ModelDomainValidationException,
    );
  });

  it('should throw ModelDomainValidationException if copyOid is not provided', () => {
    expect(() => PrinterModel.create({ ...validPrinterModel, copyOid: '' })).toThrow(
      ModelDomainValidationException,
    );
  });

  it('should throw ModelDomainValidationException if CopyOid is less than 10 characters', () => {
    expect(() => PrinterModel.create({ ...validPrinterModel, copyOid: '1.2.3.4.5' })).toThrow(
      ModelDomainValidationException,
    );
  });
});
