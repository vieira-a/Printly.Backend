import { ModelDomainValidationException } from '@printer/domain/exceptions';
import { Model } from '../model';

describe('Model Entity', () => {
  it('should create a new Model with correct params', () => {
    const newModel = Model.create(
      'Kyocera',
      'KM2040DN',
      '1.2.1.2.3.5.6.7.41.10',
      '1.2.1.2.3.5.6.7.41.11',
    );

    expect(newModel).toBeInstanceOf(Model);
    expect(newModel.id).toBeDefined();
    expect(newModel.manufacturer).toBe('Kyocera');
    expect(newModel.description).toBe('KM2040DN');
    expect(newModel.printOid).toBe('1.2.1.2.3.5.6.7.41.10');
    expect(newModel.copyOid).toBe('1.2.1.2.3.5.6.7.41.11');
    expect(newModel.createdAt).toBeInstanceOf(Date);
    expect(newModel.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw ModelDomainValidationException if Manufacturer is not provided', () => {
    expect(() =>
      Model.create('', 'KM2040DN', '1.2.1.2.3.5.6.7.41.10', '1.2.1.2.3.5.6.7.41.11'),
    ).toThrow(ModelDomainValidationException);
  });

  it('should throw ModelDomainValidationException if Manufacturer is null', () => {
    expect(() =>
      Model.create(null as any, 'KM2040DN', '1.2.1.2.3.5.6.7.41.10', '1.2.1.2.3.5.6.7.41.11'),
    ).toThrow(ModelDomainValidationException);
  });

  it('should throw ModelDomainValidationException if Manufacturer name is less than 3 characters', () => {
    expect(() =>
      Model.create('Ky', 'KM2040DN', '1.2.1.2.3.5.6.7.41.10', '1.2.1.2.3.5.6.7.41.11'),
    ).toThrow(ModelDomainValidationException);
  });

  it('should throw ModelDomainValidationException if Description is not provided', () => {
    expect(() =>
      Model.create('Kyocera', '', '1.2.1.2.3.5.6.7.41.10', '1.2.1.2.3.5.6.7.41.11'),
    ).toThrow(ModelDomainValidationException);
  });

  it('should throw ModelDomainValidationException if Description is null', () => {
    expect(() =>
      Model.create('Kyocera', null as any, '1.2.1.2.3.5.6.7.41.10', '1.2.1.2.3.5.6.7.41.11'),
    ).toThrow(ModelDomainValidationException);
  });

  it('should throw ModelDomainValidationException if Description is less than 3 characters', () => {
    expect(() =>
      Model.create('Kyocera', 'KM', '1.2.1.2.3.5.6.7.41.10', '1.2.1.2.3.5.6.7.41.11'),
    ).toThrow(ModelDomainValidationException);
  });

  it('should throw ModelDomainValidationException if PrintOid is not provided', () => {
    expect(() => Model.create('Kyocera', 'KM2040DN', '', '1.2.1.2.3.5.6.7.41.11')).toThrow(
      ModelDomainValidationException,
    );
  });

  it('should throw ModelDomainValidationException if PrintOid is null', () => {
    expect(() => Model.create('Kyocera', 'KM2040DN', null as any, '1.2.1.2.3.5.6.7.41.11')).toThrow(
      ModelDomainValidationException,
    );
  });

  it('should throw ModelDomainValidationException if PrintOid is less than 10 characters', () => {
    expect(() => Model.create('Kyocera', 'KM2040DN', '1.2.3.4.5', '1.2.1.2.3.5.6.7.41.11')).toThrow(
      ModelDomainValidationException,
    );
  });

  it('should throw ModelDomainValidationException if CopyOid is not provided', () => {
    expect(() => Model.create('Kyocera', 'KM2040DN', '', '1.2.1.2.3.5.6.7.41.11')).toThrow(
      ModelDomainValidationException,
    );
  });

  it('should throw ModelDomainValidationException if CopyOid is null', () => {
    expect(() => Model.create('Kyocera', 'KM2040DN', '1.2.1.2.3.5.6.7.41.11', null as any)).toThrow(
      ModelDomainValidationException,
    );
  });

  it('should throw ModelDomainValidationException if CopyOid is less than 10 characters', () => {
    expect(() => Model.create('Kyocera', 'KM2040DN', '1.2.1.2.3.5.6.7.41.11', '1.2.3.4.5')).toThrow(
      ModelDomainValidationException,
    );
  });
});
