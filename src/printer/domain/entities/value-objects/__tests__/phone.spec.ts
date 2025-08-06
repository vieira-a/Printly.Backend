import { InvalidParamException } from '@printer/domain/exceptions';
import { Phone } from '../phone';

describe('Phone', () => {
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
});
