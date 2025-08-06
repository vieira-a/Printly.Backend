import { InvalidParamException, MissingParamException } from '../../exceptions';
import { Model } from '../model';

describe('Model entity', () => {
  it('should create a new Model with correct params', () => {
    const newModel = Model.Create('Kyocera', 'KM2040DN', '1.2.1.2.3.5.6.7.41.10', '1.2.1.2.3.5.6.7.41.11');

    expect(newModel).toBeInstanceOf(Model);
    expect(newModel.Id).toBeDefined();
    expect(newModel.Manufacturer).toBe('Kyocera');
    expect(newModel.Description).toBe('KM2040DN');
    expect(newModel.OidPrint).toBe('1.2.1.2.3.5.6.7.41.10');
    expect(newModel.Oidcopy).toBe('1.2.1.2.3.5.6.7.41.11');
    expect(newModel.CreatedAt).toBeInstanceOf(Date);
    expect(newModel.UpdatedAt).toBeInstanceOf(Date);
  });

  it('should throw MissingParamException if Manufacturer is not provided', () => {
    expect(() => Model.Create('', 'KM2040DN', '1.2.1.2.3.5.6.7.41.10', '1.2.1.2.3.5.6.7.41.11'))
      .toThrow(new MissingParamException('Nome do fabricante não informado.'))
  })

  it('should throw MissingParamException if Manufacturer is null', () => {
    expect(() => Model.Create(null as any, 'KM2040DN', '1.2.1.2.3.5.6.7.41.10', '1.2.1.2.3.5.6.7.41.11'))
      .toThrow(new MissingParamException('Nome do fabricante não informado.'))
  })

  it('should throw InvalidParamException if Manufacturer name is less than 3 characters', () => {
    expect(() => Model.Create('Ky', 'KM2040DN', '1.2.1.2.3.5.6.7.41.10', '1.2.1.2.3.5.6.7.41.11'))
      .toThrow(new InvalidParamException('Nome do fabricante deve conter no mínimo 3 caracteres.'))
  })

  it('should throw MissingParamException if Description is not provided', () => {
    expect(() => Model.Create('Kyocera', '', '1.2.1.2.3.5.6.7.41.10', '1.2.1.2.3.5.6.7.41.11'))
      .toThrow(new MissingParamException('Descrição do modelo não informado.'))
  })

  it('should throw MissingParamException if Description is null', () => {
    expect(() => Model.Create('Kyocera', null as any, '1.2.1.2.3.5.6.7.41.10', '1.2.1.2.3.5.6.7.41.11'))
      .toThrow(new MissingParamException('Descrição do modelo não informado.'))
  })

  it('should throw InvalidParamException if Description is less than 3 characters', () => {
    expect(() => Model.Create('Kyocera', 'KM', '1.2.1.2.3.5.6.7.41.10', '1.2.1.2.3.5.6.7.41.11'))
      .toThrow(new InvalidParamException('Descrição do modelo deve conter no mínimo 3 caracteres.'))
  })

  it('should throw MissingParamException if Description is not provided', () => {
    expect(() => Model.Create('Kyocera', 'KM2040DN', '', '1.2.1.2.3.5.6.7.41.11'))
      .toThrow(new MissingParamException('OID de contador não informado.'))
  })

  it('should throw MissingParamException if Description is null', () => {
    expect(() => Model.Create('Kyocera', 'KM2040DN', null as any, '1.2.1.2.3.5.6.7.41.11'))
      .toThrow(new MissingParamException('OID de contador não informado.'))
  })

  it('should throw InvalidParamException if Description is less than 10 characters', () => {
    expect(() => Model.Create('Kyocera', 'KM2040DN', '1.2.3.4.5', '1.2.1.2.3.5.6.7.41.11'))
      .toThrow(new InvalidParamException('OID de contador deve conter no mínimo 10 caracteres.'))
  })
});
