import { CepDomainValidationException } from '../../../exceptions';
import { CEP } from '../cep';

describe('CEP Value Object', () => {
  it('should throw MissingParamException if CEP is not provided', () => {
    expect(() => CEP.create(null as any)).toThrow(CepDomainValidationException);
  });

  it('should throw InvalidParamException if CEP does not has 8 numeric characters', () => {
    expect(() => CEP.create('4000000')).toThrow(CepDomainValidationException);
  });
});
