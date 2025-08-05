import { InvalidParamException } from '../../exceptions/invalid.param.exception';
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

  it('should throw InvalidParamException if Manufacturer is not provided', () => {
    expect(() => Model.Create('', 'KM2040DN', '1.2.1.2.3.5.6.7.41.10', '1.2.1.2.3.5.6.7.41.11'))
      .toThrow(new InvalidParamException('Nome do fabricante inválido ou não informado.'))
  })
});
