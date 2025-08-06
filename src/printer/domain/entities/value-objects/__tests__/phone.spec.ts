import { InvalidParamException } from '@printer/domain/exceptions';
import { Phone } from '../phone';

describe('Phone Value Object', () => {
  it('should create a new cell phone with correct params', () => {
    const newCellPhone = Phone.create(71, 999999999);
    expect(newCellPhone).toBeInstanceOf(Phone);
    expect(newCellPhone.toString()).toBe('71999999999');
  });

  it('should create a new fixed phone with correct params', () => {
    const newFixedPhone = Phone.create(71, 33333333);
    expect(newFixedPhone.toString()).toBe('7133333333');
  });

  it('should throw an InvalidParamException if DDD is not a number between 11 and 99', () => {
    expect(() => Phone.create(10, 999999999)).toThrow(
      new InvalidParamException('DDD deve conter dois dígitos entre 11 e 99.'),
    );
  });

  it('should throw an InvalidParamException if phone number has less than 8 digits', () => {
    expect(() => Phone.create(71, 9999999)).toThrow(
      new InvalidParamException('Número de telefone deve conter 8 ou 9 digitos.'),
    );
  });

  it('should throw an InvalidParamException if phone number has more than 9 digits', () => {
    expect(() => Phone.create(71, 9999999999)).toThrow(
      new InvalidParamException('Número de telefone deve conter 8 ou 9 digitos.'),
    );
  });

  it('should throw an InvalidParamException if cell phone does not starts with 9', () => {
    expect(() => Phone.create(71, 899999999)).toThrow(
      new InvalidParamException('Número de celular deve começar com 9.'),
    );
  });

  it('should throw an InvalidParamException if fixed phone starts with 9', () => {
    expect(() => Phone.create(71, 99999999)).toThrow(
      new InvalidParamException('Número fixo não deve começar com 9.'),
    );
  });
});
