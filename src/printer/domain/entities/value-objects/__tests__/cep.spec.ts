import { CEP } from '../cep';

describe('CEP Value Object', () => {
  it('should return error if CEP is null or empty', () => {
    const cep = CEP.create('');
    const errors = cep.validate();
    expect(errors).toContain('CEP não informado.');
  });

  it('should return error if CEP does not have 8 numeric characters', () => {
    const cep = CEP.create('4000000');
    const errors = cep.validate();
    expect(errors).toContain('CEP deve conter 8 digitos.');
  });

  it('should return no errors for valid CEP', () => {
    const cep = CEP.create('12345678');
    const errors = cep.validate();
    expect(errors.length).toBe(0);
  });
});
