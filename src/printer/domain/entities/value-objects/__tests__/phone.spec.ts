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
});
