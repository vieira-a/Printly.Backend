import { InvalidParamException, MissingParamException } from '../../../exceptions';
import { CEP } from '../cep';

describe('CEP Value Object', () => {
  it('should throw MissingParamException if CEP is not provided', () => {
    expect(() => CEP.create(null as any)).toThrow(new MissingParamException('CEP não informado.'));
  });

  it('should throw InvalidParamException if CEP does not has 8 numeric characters', () => {
    expect(() => CEP.create('4000000')).toThrow(
      new InvalidParamException('CEP deve conter 8 digitos.'),
    );
  });
});
