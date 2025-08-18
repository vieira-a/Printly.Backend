import { CepDomainValidationException } from '@printer/domain/exceptions';
import { CEP } from '../cep';

describe('CEP Value Object', () => {
  it('should return error if CEP is null or empty', () => {
    expect(() => CEP.create('')).toThrow(CepDomainValidationException);
  });

  it('should return error if CEP does not have 8 numeric characters', () => {
    expect(() => CEP.create('4000000')).toThrow(CepDomainValidationException);
  });

  it('should create a CEP with corret params', () => {
    const newCep = CEP.create('12345678');
    expect(newCep.value).toBe('12345678');
  });

  it('should get a formatted CEP with mask xxxxx-xxx', () => {
    const newCep = CEP.create('12345678');
    expect(newCep.getFormatted()).toBe('12345-678');
  });
});
